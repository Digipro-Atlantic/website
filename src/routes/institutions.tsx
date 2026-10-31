import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '@/data/seo'
import { InstitutionsPage } from '@/containers/Institutions'

export const Route = createFileRoute('/institutions')({
    head: () => pageHead('/institutions'),
    component: InstitutionsPage,
})
