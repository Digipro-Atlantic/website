import { useEffect, useRef, useState } from 'react'

type Options = {
    /** Wait after `ready` before the first item may show. */
    firstDelayMs?: number
    /** Minimum gap between consecutive items. */
    gapMs?: number
}

/**
 * Reveals a list strictly in order as the reader scrolls to each item.
 * Items report when they enter view (`markEntered`); the next one is released
 * once it has entered, the one before it is out, and the gap has passed, so a
 * fast scroll still reads 1 → 2 → 3. Nothing shows until `ready` (e.g. the
 * artwork beside the list has appeared).
 */
export const useSequentialReveal = (
    count: number,
    ready: boolean,
    { firstDelayMs = 400, gapMs = 150 }: Options = {},
) => {
    const [entered, setEntered] = useState<ReadonlySet<number>>(() => new Set())
    const [revealed, setRevealed] = useState(0)
    const readyAt = useRef<number | null>(null)
    const lastRevealAt = useRef(0)

    useEffect(() => {
        if (ready && readyAt.current === null) {
            readyAt.current = performance.now()
        }
    }, [ready])

    useEffect(() => {
        const startedAt = readyAt.current
        if (revealed >= count || !entered.has(revealed) || startedAt === null)
            return

        const readyTime =
            revealed === 0
                ? startedAt + firstDelayMs
                : lastRevealAt.current + gapMs
        const id = window.setTimeout(
            () => {
                lastRevealAt.current = performance.now()
                setRevealed((current) => current + 1)
            },
            Math.max(0, readyTime - performance.now()),
        )
        return () => window.clearTimeout(id)
    }, [entered, revealed, ready, count, firstDelayMs, gapMs])

    const markEntered = (index: number) =>
        setEntered((current) =>
            current.has(index) ? current : new Set(current).add(index),
        )

    /** How many items, from the top, are shown. */
    return { revealed, markEntered }
}
