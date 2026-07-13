import { createFileRoute } from '@tanstack/react-router'
import { Cta } from '@/containers/Home'
import { FinancingSection } from '@/containers/Financing'

export const Route = createFileRoute('/financing')({
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
