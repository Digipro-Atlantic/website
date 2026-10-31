import {
    HeadContent,
    Outlet,
    createRootRoute,
    useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Footer, Header } from '@/components'
import { NotFoundPage } from '@/containers/NotFound'
import { siteHead } from '@/data/seo'

export const Route = createRootRoute({
    head: () => siteHead,
    component: RootComponent,
    notFoundComponent: NotFoundPage,
})

function RootComponent() {
    const pathname = useRouterState({ select: (s) => s.location.pathname })
    const prefersReducedMotion = useReducedMotion()

    return (
        <>
            {/* Per-page title, description, canonical and preview tags (React 19 hoists them into <head>). */}
            <HeadContent />
            <Header />
            <AnimatePresence
                mode="wait"
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
                <motion.div
                    key={pathname}
                    initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
                    transition={{
                        duration: prefersReducedMotion ? 0 : 0.2,
                    }}
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>
            <Footer />
            <TanStackRouterDevtools />
        </>
    )
}
