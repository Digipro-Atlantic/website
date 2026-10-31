import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '@/data/seo'
import { TermsPage } from '@/containers/Legal'

export const Route = createFileRoute('/terms')({
    head: () => pageHead('/terms'),
    component: TermsPage,
})
