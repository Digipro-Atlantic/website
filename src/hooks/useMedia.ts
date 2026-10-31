import { useSyncExternalStore } from 'react'

const subscribe = (query: string) => (onChange: () => void) => {
    const list = window.matchMedia(query)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
}

/** Live `matchMedia(query).matches`; false during server rendering. */
export const useMedia = (query: string) =>
    useSyncExternalStore(
        subscribe(query),
        () => window.matchMedia(query).matches,
        () => false,
    )
