import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { hero } from '@/data/home'

// Prototype: "After delay" → Smart animate, Ease in and out. Fade length lives in the class below (duration-700).
const HOLD_MS = 3000
const { dashboards } = hero

/**
 * Crossfades the tenant → owner → agency dashboards. The tenant view loads
 * with the page; the others are fetched shortly after it has painted. Cycling
 * pauses off-screen, on hover, in background tabs, and for reduced motion.
 *
 * The incoming image fades in on top of the outgoing one, which stays opaque
 * underneath, so the card never dips to see-through mid-fade.
 */
export const HeroDashboards = () => {
    const reduce = useReducedMotion()
    const { ref, inView } = useInView({ threshold: 0.25 })
    const [active, setActive] = useState(0)
    const [previous, setPrevious] = useState<number | null>(null)
    const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set())
    const [fetchRest, setFetchRest] = useState(false)
    const [hovered, setHovered] = useState(false)

    const firstLoaded = loaded.has(0)

    useEffect(() => {
        if (reduce || !firstLoaded) return
        const id = window.setTimeout(() => setFetchRest(true), 1000)
        return () => window.clearTimeout(id)
    }, [reduce, firstLoaded])

    useEffect(() => {
        if (reduce || !inView || hovered) return
        const next = (active + 1) % dashboards.length
        if (!loaded.has(next)) return
        const id = window.setTimeout(() => {
            if (document.hidden) return
            setPrevious(active)
            setActive(next)
        }, HOLD_MS)
        return () => window.clearTimeout(id)
    }, [reduce, inView, hovered, active, loaded])

    // Decode before a dashboard joins the rotation, so the fade never waits on a 2656px image decode.
    const markLoaded = (image: HTMLImageElement, index: number) =>
        image
            .decode()
            .catch(() => {})
            .finally(() => setLoaded((current) => new Set(current).add(index)))

    return (
        <div
            ref={ref}
            role="img"
            aria-label={hero.dashboardsLabel}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            className="relative aspect-1328/944 overflow-hidden rounded-lg shadow-4xl ring-1 ring-grey-200 sm:rounded-2xl xl:rounded-3xl"
        >
            {dashboards.map((dashboard, index) => (
                <img
                    key={dashboard.id}
                    src={index === 0 || fetchRest ? dashboard.src : undefined}
                    alt=""
                    width={dashboard.width}
                    height={dashboard.height}
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    onLoad={(event) => markLoaded(event.currentTarget, index)}
                    className={`absolute max-w-none transition-opacity duration-500 ease-[cubic-bezier(0.42,0,0.58,1)] will-change-[opacity] ${dashboard.className} ${
                        index === active
                            ? 'z-20 opacity-100'
                            : index === previous
                              ? 'z-10 opacity-100'
                              : 'z-0 opacity-0'
                    }`}
                />
            ))}
        </div>
    )
}
