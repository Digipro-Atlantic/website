import { createFileRoute } from '@tanstack/react-router'
import { Cta } from '@/containers/Home'
import { Capabilities, Ecosystem } from '@/containers/Platform'

export const Route = createFileRoute('/platform')({
    component: PlatformPage,
})

function PlatformPage() {
    return (
        <main>
            <Capabilities />
            <Ecosystem />
            <Cta />
        </main>
    )
}
