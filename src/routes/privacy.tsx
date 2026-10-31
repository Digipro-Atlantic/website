import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '@/data/seo'
import { PrivacyPage } from '@/containers/Legal'

export const Route = createFileRoute('/privacy')({
    head: () => pageHead('/privacy'),
    component: PrivacyPage,
})
