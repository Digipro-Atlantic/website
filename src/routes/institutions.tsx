import { createFileRoute } from '@tanstack/react-router'
import { InstitutionsPage } from '@/containers/Institutions'

export const Route = createFileRoute('/institutions')({
    component: InstitutionsPage,
})
