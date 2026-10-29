import { createFileRoute } from '@tanstack/react-router'
import { EstatesPage } from '@/containers/Estates'

export const Route = createFileRoute('/estates')({
    component: EstatesPage,
})
