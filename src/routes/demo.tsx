import { createFileRoute } from '@tanstack/react-router'
import { DemoPage } from '@/containers/Demo'

type DemoSearch = {
    intent?: 'partner'
}

export const Route = createFileRoute('/demo')({
    validateSearch: (search: Record<string, unknown>): DemoSearch => ({
        intent: search.intent === 'partner' ? 'partner' : undefined,
    }),
    component: DemoRoute,
})

function DemoRoute() {
    const { intent } = Route.useSearch()
    return <DemoPage intent={intent} />
}
