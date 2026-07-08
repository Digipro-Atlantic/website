import { createFileRoute } from '@tanstack/react-router'
import { Logo } from '@/components'

export const Route = createFileRoute('/')({
    component: IndexComponent,
})

function IndexComponent() {
    return (
        <div>
            <header className="hero-gradient-dark text-white">
                <div className="wrap flex h-[72px] items-center">
                    <Logo />
                </div>
            </header>

            <main className="wrap py-12">
                <h1 className="font-display text-4xl">Welcome Home!</h1>
            </main>
        </div>
    )
}
