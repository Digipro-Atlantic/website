import { createFileRoute } from '@tanstack/react-router'
import { CtaBanner } from '@/components/CtaBanner'
import { FinancingSection } from '@/containers/Financing'

export const Route = createFileRoute('/financing')({
    component: FinancingPage,
})

function FinancingPage() {
    return (
        <main>
            <FinancingSection />
            <CtaBanner />
        </main>
    )
}
