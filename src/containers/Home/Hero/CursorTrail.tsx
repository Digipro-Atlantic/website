import { useEffect, useRef } from 'react'
import glow from '@/assets/home/hero-glow.svg'

const CELL = 80 // Figma "trailing cursor" grid: 80px cells
const GLOW = 730 // size of the active-cell glow asset
const POOL = 16

/**
 * Glow that trails the pointer across an invisible 80px grid (Figma "Hover"
 * component). A small pool of glows is recycled and moved with direct DOM
 * writes, so pointer movement never re-renders React. Each glow fades in fast
 * and out slowly, which is what leaves the trail.
 */
export const CursorTrail = () => {
    const layerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const layer = layerRef.current
        const host = layer?.parentElement
        if (!layer || !host) return

        // Decorative only: skip on touch screens and for reduced motion.
        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (!canHover.matches || reduce.matches) return

        const glows = Array.from(layer.children) as HTMLElement[]
        const timers = new Map<HTMLElement, number>()
        let next = 0
        let lastCell = ''

        const onMove = (event: PointerEvent) => {
            const rect = host.getBoundingClientRect()
            const col = Math.floor((event.clientX - rect.left) / CELL)
            const row = Math.floor((event.clientY - rect.top) / CELL)
            const cell = `${col}:${row}`
            if (cell === lastCell) return
            lastCell = cell

            const el = glows[next]
            next = (next + 1) % glows.length
            el.style.transform = `translate3d(${col * CELL + (CELL - GLOW) / 2}px, ${row * CELL + (CELL - GLOW) / 2}px, 0)`
            el.dataset.active = ''
            window.clearTimeout(timers.get(el))
            timers.set(
                el,
                window.setTimeout(() => delete el.dataset.active, 150),
            )
        }

        const onLeave = () => {
            lastCell = ''
        }

        host.addEventListener('pointermove', onMove, { passive: true })
        host.addEventListener('pointerleave', onLeave)
        return () => {
            host.removeEventListener('pointermove', onMove)
            host.removeEventListener('pointerleave', onLeave)
            timers.forEach((id) => window.clearTimeout(id))
        }
    }, [])

    return (
        <div
            ref={layerRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
            {Array.from({ length: POOL }, (_, i) => (
                <img
                    key={i}
                    src={glow}
                    alt=""
                    width={GLOW}
                    height={GLOW}
                    className="absolute top-0 left-0 max-w-none opacity-0 transition-opacity duration-1000 ease-out data-active:opacity-100 data-active:duration-150"
                />
            ))}
        </div>
    )
}
