import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '@/data/seo'
import { EstatesPage } from '@/containers/Estates'

export const Route = createFileRoute('/estates')({
    head: () => pageHead('/estates'),
    component: EstatesPage,
})
