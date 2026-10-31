import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '@/data/seo'
import { ContactPage } from '@/containers/Contact'

export const Route = createFileRoute('/contact')({
    head: () => pageHead('/contact'),
    component: ContactPage,
})
