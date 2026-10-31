import { useEffect, useId, useRef } from 'react'
import { animate, cubicBezier, useReducedMotion } from 'motion/react'
import base from '@/assets/platform/ecosystem/base.webp'
import line from '@/assets/platform/ecosystem/line.webp'
import lockBody from '@/assets/platform/ecosystem/lock-body.webp'
import lockShackle from '@/assets/platform/ecosystem/lock-shackle.webp'
import nodeLeft from '@/assets/platform/ecosystem/node-left.webp'
import nodeRight from '@/assets/platform/ecosystem/node-right.webp'
import {
    ART,
    HIDDEN_SPAN,
    LINE_PATH,
    LOCK_BODY,
    LOCK_SHACKLE,
    NODES,
    SHACKLE_UP,
} from './ecosystemArt'

const DURATION_S = 2.4
const START_DELAY_S = 0.6 // let the photo finish rising in first
const EASE = [0.65, 0, 0.35, 1] as const // ease-in-out cubic, as on the home page
// Share of the draw spent behind him, so the line doesn't stall out of sight.
const HIDDEN_TIME = 0.05
const NODE_POP = { type: 'spring', visualDuration: 0.4, bounce: 0.35 } as const
const SHACKLE_SNAP = {
    type: 'spring',
    visualDuration: 0.3,
    bounce: 0.4,
} as const
const SHACKLE_OPEN = 22 // art px the shackle sits raised before the line arrives

const nodeImages = { left: nodeLeft, right: nodeRight } as const
const shackleTransform = (open: number) =>
    `translate(${SHACKLE_UP.x * SHACKLE_OPEN * open} ${SHACKLE_UP.y * SHACKLE_OPEN * open})`

// Eased time → share of the path: visible stretches move at one speed, the hidden one is skipped quickly.
const { from: hiddenFrom, to: hiddenTo } = HIDDEN_SPAN
const beforeTime =
    (hiddenFrom / (1 - (hiddenTo - hiddenFrom))) * (1 - HIDDEN_TIME)
const toPath = (u: number) => {
    if (u < beforeTime) return (u / beforeTime) * hiddenFrom
    if (u < beforeTime + HIDDEN_TIME)
        return (
            hiddenFrom +
            ((u - beforeTime) / HIDDEN_TIME) * (hiddenTo - hiddenFrom)
        )
    const after =
        (u - beforeTime - HIDDEN_TIME) / (1 - beforeTime - HIDDEN_TIME)
    return hiddenTo + after * (1 - hiddenTo)
}

// The reverse, to schedule things for the moment the line reaches them.
const fromPath = (p: number) => {
    if (p < hiddenFrom) return (p / hiddenFrom) * beforeTime
    if (p < hiddenTo)
        return (
            beforeTime +
            ((p - hiddenFrom) / (hiddenTo - hiddenFrom)) * HIDDEN_TIME
        )
    return (
        beforeTime +
        HIDDEN_TIME +
        ((p - hiddenTo) / (1 - hiddenTo)) * (1 - beforeTime - HIDDEN_TIME)
    )
}
const easing = cubicBezier(...EASE)
/** Seconds after the effect starts at which the line reaches share `p` of the path. */
const reachesAt = (p: number) => {
    const target = fromPath(p)
    let lo = 0
    let hi = 1
    for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2
        if (easing(mid) < target) lo = mid
        else hi = mid
    }
    return START_DELAY_S + lo * DURATION_S
}

/**
 * The "Ecosystem and reach" artwork, split into layers (man, line, nodes,
 * padlock). The line draws out of his tablet, slips behind his shoulders and
 * loops round; each node pops as the line reaches it, and when it arrives at
 * the padlock the open shackle snaps shut. Reduced motion shows the finished
 * picture.
 */
export const EcosystemIllustration = ({ play }: { play: boolean }) => {
    const reduce = useReducedMotion()
    const maskId = `eco-line-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
    const revealRef = useRef<SVGPathElement>(null)
    const lockRef = useRef<SVGGElement>(null)
    const shackleRef = useRef<SVGGElement>(null)
    const nodeRefs = useRef(new Map<string, SVGGElement>())

    useEffect(() => {
        const reveal = revealRef.current
        const lock = lockRef.current
        const shackle = shackleRef.current
        if (!play || reduce || !reveal || !lock || !shackle) return

        // Everything is scheduled up front, timed to when the line arrives.
        const draw = animate(0, 1, {
            duration: DURATION_S,
            delay: START_DELAY_S,
            ease: EASE,
            onUpdate: (u) => {
                reveal.style.strokeDashoffset = String(1 - toPath(u))
            },
        })

        const pops = NODES.flatMap((node) => {
            const group = nodeRefs.current.get(node.id)
            if (!group) return []
            const cx = node.x + node.width / 2
            const cy = node.y + node.height / 2
            return [
                animate(0, 1, {
                    ...NODE_POP,
                    delay: reachesAt(node.at),
                    onUpdate: (v) => {
                        group.setAttribute(
                            'transform',
                            `translate(${cx} ${cy}) scale(${0.4 + 0.6 * v}) translate(${-cx} ${-cy})`,
                        )
                        group.setAttribute(
                            'opacity',
                            String(Math.min(1, v * 2)),
                        )
                    },
                }),
            ]
        })

        const lockedAt = START_DELAY_S + DURATION_S
        const lockX = LOCK_BODY.x + LOCK_BODY.width / 2
        const lockY = LOCK_BODY.y + LOCK_BODY.height / 2
        const snap = animate(1, 0, {
            ...SHACKLE_SNAP,
            delay: lockedAt,
            onUpdate: (open) =>
                shackle.setAttribute('transform', shackleTransform(open)),
        })
        // A small "click" through the whole lock as it closes.
        const click = animate(1, [1, 1.06, 1], {
            duration: 0.35,
            delay: lockedAt,
            ease: 'easeOut',
            onUpdate: (scale) =>
                lock.setAttribute(
                    'transform',
                    `translate(${lockX} ${lockY}) scale(${scale}) translate(${-lockX} ${-lockY})`,
                ),
        })

        const running = [draw, ...pops, snap, click]
        return () => running.forEach((animation) => animation.stop())
    }, [play, reduce])

    return (
        <div className="relative">
            <img
                src={base}
                alt=""
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
                            d={LINE_PATH}
                            fill="none"
                            stroke="#fff"
                            strokeWidth={24}
                            strokeLinecap="round"
                            pathLength={1}
                            strokeDasharray="1 1"
                            strokeDashoffset={reduce ? 0 : 1}
                        />
                    </mask>
                </defs>
                <image
                    href={line}
                    width={ART.width}
                    height={ART.height}
                    mask={`url(#${maskId})`}
                />
                {NODES.map((node) => (
                    <g
                        key={node.id}
                        ref={(el) => {
                            if (el) nodeRefs.current.set(node.id, el)
                            else nodeRefs.current.delete(node.id)
                        }}
                        opacity={reduce ? 1 : 0}
                    >
                        <image
                            href={nodeImages[node.id]}
                            x={node.x}
                            y={node.y}
                            width={node.width}
                            height={node.height}
                        />
                    </g>
                ))}
                <g ref={lockRef}>
                    {/* Behind the body, so the snap's overshoot tucks into it. */}
                    <g
                        ref={shackleRef}
                        transform={reduce ? undefined : shackleTransform(1)}
                    >
                        <image href={lockShackle} {...LOCK_SHACKLE} />
                    </g>
                    <image href={lockBody} {...LOCK_BODY} />
                </g>
            </svg>
        </div>
    )
}
