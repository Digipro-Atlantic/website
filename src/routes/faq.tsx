import { createFileRoute } from '@tanstack/react-router'
import { FaqPage } from '@/containers/Faq'

export const Route = createFileRoute('/faq')({
    component: FaqPage,
})
