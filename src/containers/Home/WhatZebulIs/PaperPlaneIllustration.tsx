import { useEffect, useId, useRef } from 'react'
import { animate, useReducedMotion } from 'motion/react'
import base from '@/assets/home/what-zebul-is/base.webp'
import blocksArt from '@/assets/home/what-zebul-is/blocks.webp'
import line from '@/assets/home/what-zebul-is/line.webp'
import plane from '@/assets/home/what-zebul-is/plane.webp'
import { BLOCKS, type Block } from './blocks'
import { ART, FLIGHT_PATH, HIDDEN_SPAN, PLANE_ANCHOR } from './flightPath'

const DURATION_S = 2.4
const START_DELAY_S = 0.5 // let the illustration finish sliding in first
const EASE = [0.65, 0, 0.35, 1] as const // ease-in-out cubic: lift off, cruise, settle
const FADE = 0.02 // share of the flight used to fade the plane in/out

// Blocks fall in order during the flight; the last one touches down as the plane lands.
// Times are seconds after the plane takes off.
const DROP_AT_S: Record<number, number> = {
    1: 0.2,
    2: 0.65,
    3: 1.1,
    4: 1.55,
    5: DURATION_S - 0.4,
}
const DROP_HEIGHT = 110 // art px
const DROP_SPRING = {
    type: 'spring',
    visualDuration: 0.45,
    bounce: 0.3,
} as const
// Once the stack is complete, hand back to the artwork's own blocks.
const SETTLE_AT_S = DURATION_S + 0.5
const SETTLE_S = 0.3

const planeOpacity = (p: number) => {
    const fadeIn = Math.min(1, p / FADE)
    if (p < HIDDEN_SPAN.from - FADE) return fadeIn
    if (p < HIDDEN_SPAN.from) return (HIDDEN_SPAN.from - p) / FADE
    if (p < HIDDEN_SPAN.to) return 0
    return Math.min(1, (p - HIDDEN_SPAN.to) / FADE)
}

const VectorBlock = ({
    block,
    dotsId,
    groupRef,
}: {
    block: Block
    dotsId: string
    groupRef: (el: SVGGElement | null) => void
}) => {
    const clipId = `${dotsId}-${block.id}`
    const outline = { fill: 'none', stroke: '#000', strokeWidth: 3.2 }
    return (
        <g ref={groupRef} opacity={0}>
            {block.circle && (
                <>
                    <clipPath id={clipId}>
                        <circle {...block.circle} />
                    </clipPath>
                    <circle {...block.circle} fill="#fff" />
                </>
            )}
            {block.faces.map((points) => (
                <polygon key={points} points={points} fill="#fff" />
            ))}
            {block.shades.map((points) => (
                <polygon
                    key={points}
                    points={points}
                    fill={`url(#${dotsId})`}
                    clipPath={block.circle ? `url(#${clipId})` : undefined}
                />
            ))}
            {block.circle && <circle {...block.circle} {...outline} />}
            {block.faces.map((points) => (
                <polygon key={points} points={points} {...outline} />
            ))}
            {block.lines.map((points) => (
                <polyline key={points} points={points} {...outline} />
            ))}
        </g>
    )
}

/**
 * The "What Zebul is" artwork with its paper plane flying out of the laptop.
 * The flat illustration is split into layers (scene, line, plane, blocks). The
 * line is revealed along the traced flight path while the plane rides its tip,
 * turning with the curve, slipping behind her shoulders, and landing exactly
 * where the artwork has it. Meanwhile the blocks drop in one by one (vector
 * copies, because the flat art has no hidden faces), the last landing with the
 * plane, then the artwork's own blocks fade back in. Reduced motion shows the
 * finished picture.
 */
export const PaperPlaneIllustration = ({ play }: { play: boolean }) => {
    const reduce = useReducedMotion()
    const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
    const maskId = `flight-${uid}`
    const dotsId = `dots-${uid}`
    const measureRef = useRef<SVGPathElement>(null)
    const revealRef = useRef<SVGPathElement>(null)
    const planeRef = useRef<SVGGElement>(null)
    const blocksArtRef = useRef<SVGImageElement>(null)
    const blockRefs = useRef(new Map<string, SVGGElement>())

    useEffect(() => {
        const path = measureRef.current
        const reveal = revealRef.current
        const planeGroup = planeRef.current
        const finalBlocks = blocksArtRef.current
        if (!play || reduce || !path || !reveal || !planeGroup || !finalBlocks)
            return

        const total = path.getTotalLength()
        const angleAt = (distance: number) => {
            const a = path.getPointAtLength(Math.max(0, distance - 2))
            const b = path.getPointAtLength(Math.min(total, distance + 2))
            return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
        }
        const landingAngle = angleAt(total)

        const flight = animate(0, 1, {
            duration: DURATION_S,
            delay: START_DELAY_S,
            ease: EASE,
            onUpdate: (p) => {
                const distance = p * total
                const point = path.getPointAtLength(distance)
                // Grows as it leaves the screen, so it reads as coming out of the laptop.
                const scale = 0.55 + 0.45 * Math.min(1, p / 0.35)
                reveal.style.strokeDashoffset = String(1 - p)
                planeGroup.style.opacity = String(planeOpacity(p))
                planeGroup.setAttribute(
                    'transform',
                    `translate(${point.x} ${point.y}) rotate(${angleAt(distance) - landingAngle}) scale(${scale}) translate(${-PLANE_ANCHOR.x} ${-PLANE_ANCHOR.y})`,
                )
            },
        })

        // Blocks and the hand-back are driven like the flight: Motion computes the values,
        // we write SVG attributes. One clock for everything, no reliance on WAAPI for SVG.
        const setOpacity = (el: Element, value: number) =>
            el.setAttribute('opacity', String(value))

        const vectors = [...blockRefs.current.values()]
        const drops = BLOCKS.flatMap((block) => {
            const group = blockRefs.current.get(block.id)
            if (!group) return []
            return [
                animate(-DROP_HEIGHT, 0, {
                    delay: START_DELAY_S + DROP_AT_S[block.drop],
                    ...DROP_SPRING,
                    onUpdate: (y) => {
                        group.setAttribute('transform', `translate(0 ${y})`)
                        // Visible within the first 25px of the fall, so it never shows early.
                        setOpacity(group, Math.min(1, (y + DROP_HEIGHT) / 25))
                    },
                }),
            ]
        })

        const settle = animate(0, 1, {
            delay: START_DELAY_S + SETTLE_AT_S,
            duration: SETTLE_S,
            ease: 'easeOut',
            onUpdate: (o) => {
                // Motion reports the starting value straight away, before the delay; ignore it
                // or every block would be forced visible before it has dropped.
                if (o === 0) return
                setOpacity(finalBlocks, o)
                vectors.forEach((group) => setOpacity(group, 1 - o))
            },
        })

        return () => {
            flight.stop()
            drops.forEach((drop) => drop.stop())
            settle.stop()
        }
    }, [play, reduce])

    return (
        <div className="relative">
            <img
                src={base}
                alt="A property manager smiling at her laptop as a paper plane flies out of it, beside a stack of blocks"
                width={ART.width}
                height={ART.height}
                loading="lazy"
                className="h-auto w-full"
            />
            <svg
                viewBox={`0 0 ${ART.width} ${ART.height}`}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 size-full overflow-visible"
            >
                <defs>
                    <path ref={measureRef} d={FLIGHT_PATH} />
                    <mask
                        id={maskId}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={ART.width}
                        height={ART.height}
                    >
                        <path
                            ref={revealRef}
                            d={FLIGHT_PATH}
                            fill="none"
                            stroke="#fff"
                            strokeWidth={30}
                            strokeLinecap="round"
                            pathLength={1}
                            strokeDasharray="1 1"
                            strokeDashoffset={reduce ? 0 : 1}
                        />
                    </mask>
                    <pattern
                        id={dotsId}
                        width={5.3}
                        height={5.3}
                        patternUnits="userSpaceOnUse"
                    >
                        <rect
                            x={1.8}
                            y={1.8}
                            width={1.6}
                            height={1.6}
                            fill="#1a1a1a"
                        />
                    </pattern>
                </defs>
                <image
                    href={line}
                    width={ART.width}
                    height={ART.height}
                    mask={`url(#${maskId})`}
                />
                {!reduce &&
                    BLOCKS.map((block) => (
                        <VectorBlock
                            key={block.id}
                            block={block}
                            dotsId={dotsId}
                            groupRef={(el) => {
                                if (el) blockRefs.current.set(block.id, el)
                                else blockRefs.current.delete(block.id)
                            }}
                        />
                    ))}
                <image
                    ref={blocksArtRef}
                    href={blocksArt}
                    width={ART.width}
                    height={ART.height}
                    opacity={reduce ? 1 : 0}
                />
                <g ref={planeRef} style={{ opacity: reduce ? 1 : 0 }}>
                    <image href={plane} width={ART.width} height={ART.height} />
                </g>
            </svg>
        </div>
    )
}
