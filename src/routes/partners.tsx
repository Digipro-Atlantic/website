import { createFileRoute } from '@tanstack/react-router'
import { PartnersPage } from '@/containers/Partners'

export const Route = createFileRoute('/partners')({
    component: PartnersPage,
})
