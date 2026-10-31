import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '@/data/seo'
import { DemoPage } from '@/containers/Demo'

type DemoSearch = {
    intent?: 'partner'
    email?: string
}

export const Route = createFileRoute('/demo')({
    head: () => pageHead('/demo'),
    validateSearch: (search: Record<string, unknown>): DemoSearch => ({
        intent: search.intent === 'partner' ? 'partner' : undefined,
        email: typeof search.email === 'string' ? search.email : undefined,
    }),
    component: DemoRoute,
})

function DemoRoute() {
    const { intent, email } = Route.useSearch()
    return <DemoPage intent={intent} email={email} />
}
