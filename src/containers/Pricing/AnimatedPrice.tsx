import { useLayoutEffect, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'motion/react'
import { formatNaira } from '@/data/pricing'

const PRICE_EASE = [0.23, 1, 0.32, 1] as const // --ease-out

/**
 * The price counts from the old period's figure to the new one when billing
 * is switched, in round hundreds so the digits read as a roll, not noise.
 * The first render and reduced motion show the figure as is.
 */
export const AnimatedPrice = ({
    value,
    label,
}: {
    value: number
    label: string
}) => {
    const ref = useRef<HTMLSpanElement>(null)
    // The first figure is rendered as text so prerendered pages (and crawlers) show
    // a price; React never changes it afterwards, the effect below owns the text.
    const [initialLabel] = useState(label)
    const shown = useRef<number | null>(null)
    const reduce = useReducedMotion()

    // The text is owned here rather than by React, so the count never fights a
    // re-render; a layout effect keeps the new figure from flashing first.
    useLayoutEffect(() => {
        const el = ref.current
        const from = shown.current
        if (!el) return
        if (from === null || from === value || reduce) {
            shown.current = value
            el.textContent = label
            return
        }
        const count = animate(from, value, {
            duration: 0.45,
            ease: PRICE_EASE,
            onUpdate: (v) => {
                shown.current = v
                el.textContent = formatNaira(Math.round(v / 100) * 100)
            },
            onComplete: () => {
                el.textContent = label
            },
        })
        return () => count.stop()
    }, [value, label, reduce])

    return <span ref={ref}>{initialLabel}</span>
}

// Swapped lines (/month → /year, billing note) remount on the period and rise in.
export const swapIn =
    'inline-block transition-[opacity,translate] duration-200 ease-out starting:translate-y-1 starting:opacity-0 motion-reduce:starting:translate-y-0'
