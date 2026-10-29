import { createFileRoute } from '@tanstack/react-router'
import { CtaBanner } from '@/components/CtaBanner'
import { EstatesSection } from '@/containers/Estates'

export const Route = createFileRoute('/estates')({
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
