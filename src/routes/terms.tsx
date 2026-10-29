import { createFileRoute } from '@tanstack/react-router'
import { TermsPage } from '@/containers/Legal'

export const Route = createFileRoute('/terms')({
    component: TermsPage,
})
