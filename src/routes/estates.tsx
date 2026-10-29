import { createFileRoute, notFound } from '@tanstack/react-router'
import { CtaBanner } from '@/components/CtaBanner'
import { EstatesSection } from '@/containers/Estates'

export const Route = createFileRoute('/estates')({
    // Soft-launch: blocked until product is ready
    beforeLoad: () => {
        throw notFound()
    },
    component: EstatesPage,
})

function EstatesPage() {
    return (
        <main>
            <EstatesSection />
            <CtaBanner />
        </main>
    )
}
