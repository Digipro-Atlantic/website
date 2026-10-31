import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '@/data/seo'
import { FaqPage } from '@/containers/Faq'

export const Route = createFileRoute('/faq')({
    head: () => pageHead('/faq'),
    component: FaqPage,
})
