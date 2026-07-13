import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Footer, Header } from '@/components'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    const pathname = useRouterState({ select: (s) => s.location.pathname })
    const prefersReducedMotion = useReducedMotion()

    return (
        <>
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
