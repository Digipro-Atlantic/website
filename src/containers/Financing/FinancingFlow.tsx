import { type CSSProperties, useEffect, useId, useRef, useState } from 'react'
import { animate, cubicBezier, useReducedMotion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { Container } from '@/components/Container'
import { financingFlow } from '@/data/financing'
import { useMedia } from '@/hooks/useMedia'
import { desktopCurve, tabletCurve } from './curves'

type Curve = typeof desktopCurve
type Step = (typeof financingFlow)[number]

const DURATION_S = 2.4
const START_DELAY_S = 0.3
const EASE = [0.65, 0, 0.35, 1] as const // ease-in-out cubic, as on the other drawn lines
const easing = cubicBezier(...EASE)
const NODE_POP = { type: 'spring', visualDuration: 0.4, bounce: 0.35 } as const

// Figma's start variant parks each step off-frame: the first two above, "FI decides"
// to the left, the last two below. Same directions, travel cut to 40px (md+ only).
const ARRIVE_FROM = [
    'md:-translate-y-10',
    'md:-translate-y-10',
    'md:translate-y-0 md:-translate-x-10',
    'md:translate-y-10',
    'md:translate-y-10',
] as const

/** Seconds after the draw starts at which the wipe passes `y` (curve space). */
const reachesAt = (curve: Curve, y: number) => {
    const target = (y - curve.span.top) / (curve.span.bottom - curve.span.top)
    let lo = 0
    let hi = 1
    for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2
        if (easing(mid) < target) lo = mid
        else hi = mid
    }
    return START_DELAY_S + lo * DURATION_S
}

const pct = (value: number, origin: number, size: number) =>
    `${(((value - origin) / size) * 100).toFixed(3)}%`

/** Step text is positioned as a percentage of the curve box so it scales with it. */
const placementVars = (step: Step) =>
    ({
        '--w': `${step.width}px`,
        '--tl': pct(
            step.tablet.x,
            tabletCurve.viewBox.x,
            tabletCurve.viewBox.width,
        ),
        '--tt': pct(
            step.tablet.y,
            tabletCurve.viewBox.y,
            tabletCurve.viewBox.height,
        ),
        '--dl': pct(
            step.desktop.x,
            desktopCurve.viewBox.x,
            desktopCurve.viewBox.width,
        ),
        '--dt': pct(
            step.desktop.y,
            desktopCurve.viewBox.y,
            desktopCurve.viewBox.height,
        ),
    }) as CSSProperties

/** The winding line, wiped in from the top, with each node popping as the line reaches it. */
const FlowCurve = ({
    curve,
    nodes,
    radius,
    play,
    reduce,
    className,
}: {
    curve: Curve
    nodes: { cx: number; cy: number }[]
    radius: number
    play: boolean
    reduce: boolean
    className: string
}) => {
    const clipId = `flow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
    const wipeRef = useRef<SVGRectElement>(null)
    const nodeRefs = useRef<(SVGCircleElement | null)[]>([])
    const { x, y, width, height } = curve.viewBox
    const { top, bottom } = curve.span

    useEffect(() => {
        const wipe = wipeRef.current
        if (!play || reduce || !wipe) return
        const draw = animate(0, 1, {
            duration: DURATION_S,
            delay: START_DELAY_S,
            ease: EASE,
            onUpdate: (p) =>
                wipe.setAttribute('height', String((bottom - top) * p)),
        })
        const pops = nodes.flatMap((node, index) => {
            const circle = nodeRefs.current[index]
            if (!circle) return []
            return [
                animate(0, 1, {
                    ...NODE_POP,
                    delay: reachesAt(curve, node.cy),
                    onUpdate: (v) => {
                        circle.setAttribute(
                            'r',
                            String(radius * (0.4 + 0.6 * v)),
                        )
                        circle.setAttribute(
                            'opacity',
                            String(Math.min(1, v * 2)),
                        )
                    },
                }),
            ]
        })
        return () => [draw, ...pops].forEach((animation) => animation.stop())
    }, [play, reduce, curve, nodes, radius, top, bottom])

    return (
        <svg
            aria-hidden="true"
            viewBox={`${x} ${y} ${width} ${height}`}
            className={`absolute inset-0 h-full w-full ${className}`}
        >
            <clipPath id={clipId}>
                <rect
                    ref={wipeRef}
                    x={x}
                    y={top}
                    width={width}
                    height={reduce ? bottom - top : 0}
                />
            </clipPath>
            <path d={curve.d} fill="#000805" clipPath={`url(#${clipId})`} />
            {nodes.map((node, index) => (
                <circle
                    key={`${node.cx}-${node.cy}`}
                    ref={(el) => {
                        nodeRefs.current[index] = el
                    }}
                    cx={node.cx}
                    cy={node.cy}
                    r={radius}
                    opacity={reduce ? 1 : 0}
                    fill="white"
                    stroke="#005B4C"
                    strokeWidth={3}
                />
            ))}
        </svg>
    )
}

const ArrowDown = () => (
    <svg
        aria-hidden="true"
        width="16"
        height="65"
        viewBox="0 0 16 65"
        fill="none"
        className="mx-auto my-4 md:hidden"
    >
        <g transform="translate(-212 -666)">
            <path
                d="M220 666H219V730H220H221V666H220ZM219.293 730.707C219.683 731.098 220.317 731.098 220.707 730.707L227.071 724.343C227.462 723.953 227.462 723.319 227.071 722.929C226.681 722.538 226.047 722.538 225.657 722.929L220 728.586L214.343 722.929C213.953 722.538 213.319 722.538 212.929 722.929C212.538 723.319 212.538 723.953 212.929 724.343L219.293 730.707Z"
                fill="black"
            />
        </g>
    </svg>
)

const FlowStep = ({
    step,
    index,
    shownOnCurve,
    wide,
    reduce,
}: {
    step: Step
    index: number
    shownOnCurve: boolean
    wide: boolean
    reduce: boolean
}) => {
    // Phones have no curve: each step (with its arrow) rises in as it scrolls into view.
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '0px 0px -15% 0px',
    })
    const shown = wide ? shownOnCurve : inView
    const hidden = reduce
        ? 'opacity-0'
        : `translate-y-4 opacity-0 ${ARRIVE_FROM[index]}`

    return (
        <li
            ref={ref}
            style={placementVars(step)}
            className={`mx-auto max-w-[275px] text-center transition-[opacity,translate] duration-500 ease-out md:absolute md:top-(--tt) md:left-(--tl) md:mx-0 md:w-(--w) md:max-w-none md:text-left xl:top-(--dt) xl:left-(--dl) ${
                shown ? 'translate-x-0 translate-y-0 opacity-100' : hidden
            }`}
        >
            <p className="text-h6 font-semibold text-grey-900 md:text-body xl:text-h6">
                {step.title}
            </p>
            <p className="mt-2 text-body text-grey-600 md:text-caption xl:text-body-sm">
                {step.description}
            </p>
            {index < financingFlow.length - 1 && <ArrowDown />}
        </li>
    )
}

const tabletNodes = financingFlow.map((step) => step.tablet)
const desktopNodes = financingFlow.map((step) => step.desktop)

/**
 * The five-step financing flow (Figma "Parralax4"). From tablet up the curve
 * draws downward and each node pops as the line reaches it; that step's text
 * then arrives from the side Figma parks it on. Phones show a stack with
 * arrows, each step rising in as it is scrolled to. Reduced motion fades.
 */
export const FinancingFlow = () => {
    const reduce = useReducedMotion() ?? false
    const wide = useMedia('(min-width: 64rem)')
    const desktop = useMedia('(min-width: 90rem)')
    const box = useInView({ triggerOnce: true, rootMargin: '0px 0px -15% 0px' })
    // How many steps the line has reached so far (tablet and up).
    const [reached, setReached] = useState(0)

    useEffect(() => {
        if (!wide || !box.inView) return
        const curve = desktop ? desktopCurve : tabletCurve
        const nodes = desktop ? desktopNodes : tabletNodes
        const ids = nodes.map((node, index) =>
            window.setTimeout(
                () => setReached((count) => Math.max(count, index + 1)),
                reduce ? 0 : reachesAt(curve, node.cy) * 1000,
            ),
        )
        return () => ids.forEach((id) => window.clearTimeout(id))
    }, [wide, desktop, box.inView, reduce])

    return (
        <Container className="mt-12 md:mt-15 xl:mt-32">
            <div
                ref={box.ref}
                className="relative mx-auto md:aspect-[820/670] md:w-205 xl:aspect-[960/780] xl:w-240"
            >
                <FlowCurve
                    curve={tabletCurve}
                    nodes={tabletNodes}
                    radius={7.5}
                    play={box.inView}
                    reduce={reduce}
                    className="hidden md:block xl:hidden"
                />
                <FlowCurve
                    curve={desktopCurve}
                    nodes={desktopNodes}
                    radius={10.5}
                    play={box.inView}
                    reduce={reduce}
                    className="hidden xl:block"
                />
                {/* Mobile: centred vertical stack with arrows. md+: steps pinned beside their curve node. */}
                <ol className="md:absolute md:inset-0">
                    {financingFlow.map((step, index) => (
                        <FlowStep
                            key={step.title}
                            step={step}
                            index={index}
                            shownOnCurve={index < reached}
                            wide={wide}
                            reduce={reduce}
                        />
                    ))}
                </ol>
            </div>
        </Container>
    )
}
