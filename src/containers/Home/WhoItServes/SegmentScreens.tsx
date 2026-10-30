import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
    animate,
    motion,
    useMotionValue,
    useReducedMotion,
    useTransform,
} from 'motion/react'
import { whoItServes } from '@/data/home'

const { segments } = whoItServes
type Segment = (typeof segments)[number]

const SINK_MS = 180 // callout settles back into the screen before the swap
const FADE_MS = 300 // incoming screen fades in over the outgoing one
const FIRST_LIFT_MS = 1000 // after the band is revealed: panes and screen land first

const SINK = { duration: SINK_MS / 1000, ease: [0.77, 0, 0.175, 1] } as const
const LIFT = { type: 'spring', duration: 0.5, bounce: 0.2 } as const

// How far the metric row pops out of the screen, per the Figma frames.
const LIFT_SCALES = [
    ['(min-width: 90rem)', 1.43],
    ['(min-width: 64rem)', 1.21],
] as const
const BASE_LIFT_SCALE = 1.32

const subscribe = (onChange: () => void) => {
    const lists = LIFT_SCALES.map(([query]) => window.matchMedia(query))
    lists.forEach((list) => list.addEventListener('change', onChange))
    return () =>
        lists.forEach((list) => list.removeEventListener('change', onChange))
}
const getLiftScale = () =>
    LIFT_SCALES.find(([query]) => window.matchMedia(query).matches)?.[1] ??
    BASE_LIFT_SCALE

const enter =
    'transition-[opacity,translate,scale] duration-700 ease-out will-change-[opacity,translate]'

/**
 * The screen's own metric row, cropped from the same screenshot. Flat, it is
 * pixel-identical to the row underneath, so it can sink and lift seamlessly.
 */
const MetricCallout = ({
    segment,
    lifted,
    scale,
    reduce,
}: {
    segment: Segment
    lifted: boolean
    scale: number
    reduce: boolean
}) => {
    // 0 = flat in the screen, 1 = fully lifted. Scale and shadow both follow it.
    const progress = useMotionValue(0)
    const liftScale = useMotionValue(scale)
    const transform = useTransform(
        () => `scale(${1 + (liftScale.get() - 1) * progress.get()})`,
    )

    useEffect(() => liftScale.set(scale), [liftScale, scale])

    useEffect(() => {
        const controls = animate(
            progress,
            lifted ? 1 : 0,
            reduce ? { duration: 0 } : lifted ? LIFT : SINK,
        )
        return () => controls.stop()
    }, [progress, lifted, reduce])

    return (
        <motion.div
            aria-hidden="true"
            style={{ transform }}
            className={`absolute left-[3.44%] h-[22.6%] w-[93.15%] ${segment.metricsClassName}`}
        >
            <motion.div
                style={{ opacity: progress }}
                className="absolute inset-0 rounded-[7px] shadow-[0_26px_14px_rgb(16_25_40/0.3),0_0_1px_rgb(16_25_40/0.04)]"
            />
            <div className="absolute inset-0 overflow-hidden rounded-[7px] bg-white">
                <img
                    src={segment.image}
                    alt=""
                    width={524}
                    height={367}
                    loading="lazy"
                    className={`absolute left-[-12.52%] w-[125%] max-w-none ${segment.metricsImageClassName}`}
                />
            </div>
        </motion.div>
    )
}

/**
 * Glass panes with the product screen on top. On reveal the panes rise in
 * order, the screen settles, then its metric row lifts out. On a tab change
 * the row sinks back, the next screen fades in over the last, and its row
 * lifts. Reduced motion keeps the fades and shows the row already lifted.
 */
export const SegmentScreens = ({
    index,
    revealed,
}: {
    index: number
    revealed: boolean
}) => {
    const reduce = useReducedMotion() ?? false
    const liftScale = useSyncExternalStore(
        subscribe,
        getLiftScale,
        () => BASE_LIFT_SCALE,
    )
    const [shown, setShown] = useState(index)
    const [below, setBelow] = useState<number | null>(null)
    const [liftedFor, setLiftedFor] = useState<number | null>(null)
    const hasLifted = useRef(false)

    // A new tab sinks the current row at once (see `lifted` below), then swaps the screen.
    useEffect(() => {
        if (index === shown) return
        const id = window.setTimeout(
            () => {
                setLiftedFor(null)
                setBelow(shown)
                setShown(index)
            },
            reduce ? 0 : SINK_MS,
        )
        return () => window.clearTimeout(id)
    }, [index, shown, reduce])

    // Once the screen is in place, lift its row out.
    useEffect(() => {
        if (!revealed) return
        const delay = reduce ? 0 : hasLifted.current ? FADE_MS : FIRST_LIFT_MS
        const id = window.setTimeout(() => {
            hasLifted.current = true
            setBelow(null)
            setLiftedFor(shown)
        }, delay)
        return () => window.clearTimeout(id)
    }, [revealed, shown, reduce])

    const hidden = (from: string) =>
        reduce ? 'opacity-0' : `opacity-0 ${from}`
    const shownClass = 'translate-y-0 scale-100 opacity-100'

    return (
        <div className="relative -mx-4 aspect-[440/276] sm:-mx-10 md:mx-0 md:aspect-auto xl:aspect-[788/495] xl:self-center">
            <div
                className={`absolute inset-0 rounded-2xl bg-linear-to-b from-[rgb(3_76_63/0)] from-11% to-[rgb(0_91_76/0.3)] to-58% delay-100 xl:rounded-[2rem] ${enter} ${
                    revealed ? shownClass : hidden('translate-y-8')
                }`}
            />
            <div
                className={`absolute top-[7.8%] left-[15.6%] h-[81%] w-[80%] rounded-2xl bg-linear-to-b from-[rgb(3_76_63/0)] from-11% to-[rgb(0_91_76/0.5)] to-[46.67%] delay-200 xl:top-[7.88%] xl:left-[12.06%] xl:h-[80.81%] xl:w-[80.84%] xl:rounded-[2rem] ${enter} ${
                    revealed ? shownClass : hidden('translate-y-8')
                }`}
            />
            <div
                className={`absolute top-[10.9%] left-1/2 aspect-[450/281] w-[68.9%] -translate-x-1/2 delay-300 md:top-[19%] md:w-[73.3%] xl:top-[16.7%] xl:w-[57.1%] ${enter} ${
                    revealed ? shownClass : hidden('translate-y-4 scale-95')
                }`}
            >
                <div className="absolute inset-0 rounded-lg shadow-[0_48px_52px_-15px_rgb(16_25_40/0.3),0_0_3px_-1px_rgb(16_25_40/0.04),0_0_0_1px_rgb(16_25_40/0.05)]" />
                {segments.map((segment, i) => (
                    <div
                        key={segment.id}
                        aria-hidden={i !== shown}
                        className={`absolute inset-0 transition-opacity duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] ${
                            i === shown
                                ? 'z-20 opacity-100'
                                : i === below
                                  ? 'z-10 opacity-100'
                                  : 'z-0 opacity-0'
                        }`}
                    >
                        {/* The export has the panel gradient baked in; crop to the card. */}
                        <div className="absolute inset-0 overflow-hidden rounded-lg">
                            <img
                                src={segment.image}
                                alt={i === shown ? segment.imageAlt : ''}
                                width={524}
                                height={367}
                                loading="lazy"
                                className="absolute top-[-0.712%] left-[-8.222%] w-[116.444%] max-w-none"
                            />
                        </div>
                        <MetricCallout
                            segment={segment}
                            lifted={
                                i === shown &&
                                index === shown &&
                                liftedFor === shown
                            }
                            scale={liftScale}
                            reduce={reduce}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
