import { createFileRoute, notFound } from '@tanstack/react-router'
import { Cta } from '@/containers/Home'
import { FinancingSection } from '@/containers/Financing'

export const Route = createFileRoute('/financing')({
    // Soft-launch: blocked until product is ready
    beforeLoad: () => {
        throw notFound()
    },
    component: FinancingPage,
})

function FinancingPage() {
    return (
        <main>
            <FinancingSection />
            <Cta />
        </main>
    )
}
