import { createFileRoute } from '@tanstack/react-router'
import { Cta } from '@/containers/Home'
import { InstitutionsSection } from '@/containers/Institutions'

export const Route = createFileRoute('/institutions')({
    component: InstitutionsPage,
})

function InstitutionsPage() {
    return (
        <main>
            <InstitutionsSection />
            <Cta />
        </main>
    )
}
