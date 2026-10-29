import { createFileRoute } from '@tanstack/react-router'
import { CtaBanner } from '@/components/CtaBanner'
import { InstitutionsSection } from '@/containers/Institutions'

export const Route = createFileRoute('/institutions')({
    component: InstitutionsPage,
})

function InstitutionsPage() {
    return (
        <main>
            <InstitutionsSection />
            <CtaBanner />
        </main>
    )
}
