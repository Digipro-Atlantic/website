import { createFileRoute } from '@tanstack/react-router'
import { FinancingPage } from '@/containers/Financing'

export const Route = createFileRoute('/financing')({
    component: FinancingPage,
})
