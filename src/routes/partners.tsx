import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '@/data/seo'
import { PartnersPage } from '@/containers/Partners'

export const Route = createFileRoute('/partners')({
    head: () => pageHead('/partners'),
    component: PartnersPage,
})
