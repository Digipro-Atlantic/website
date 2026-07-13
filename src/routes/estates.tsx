import { createFileRoute } from '@tanstack/react-router'
import { Cta } from '@/containers/Home'
import { EstatesSection } from '@/containers/Estates'

export const Route = createFileRoute('/estates')({
    component: EstatesPage,
})

function EstatesPage() {
    return (
        <main>
            <EstatesSection />
            <Cta />
        </main>
    )
}
