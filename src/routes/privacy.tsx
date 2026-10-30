import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPage } from '@/containers/Legal'

export const Route = createFileRoute('/privacy')({
    component: PrivacyPage,
})
