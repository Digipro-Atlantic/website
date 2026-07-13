import { createFileRoute } from '@tanstack/react-router'
import { Cta, EcoSection, Hero, Models, Statement } from '@/containers/Home'

export const Route = createFileRoute('/')({
    component: () => <HomePage />,
})

const HomePage = () => {
    return (
        <main>
            <Hero />
            <Statement />
            <Models />
            <EcoSection />
            <Cta />
        </main>
    )
}
