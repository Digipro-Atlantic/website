import { createFileRoute } from '@tanstack/react-router'
import { CtaBanner } from '@/components/CtaBanner'
import { Capabilities, Ecosystem } from '@/containers/Platform'

export const Route = createFileRoute('/platform')({
    component: PlatformPage,
})

function PlatformPage() {
    return (
        <main>
            <Capabilities />
            <Ecosystem />
            <CtaBanner />
        </main>
    )
}
