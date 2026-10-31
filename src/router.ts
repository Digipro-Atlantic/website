import { createRouter, type RouterHistory } from '@tanstack/react-router'
import { NotFoundPage } from '@/containers/NotFound'
import { routeTree } from './routeTree.gen'

/** One router setup for the browser (main.tsx) and the build-time prerender (entry-server.tsx). */
export const createAppRouter = (history?: RouterHistory) =>
    createRouter({
        routeTree,
        history,
        defaultPreload: 'intent',
        defaultNotFoundComponent: NotFoundPage,
    })

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createAppRouter>
    }
}
