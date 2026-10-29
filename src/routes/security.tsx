import { createFileRoute } from '@tanstack/react-router'
import { SecurityPage } from '@/containers/Security'

export const Route = createFileRoute('/security')({
    component: SecurityPage,
})
