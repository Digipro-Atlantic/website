import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '@/data/seo'
import { FinancingPage } from '@/containers/Financing'

export const Route = createFileRoute('/financing')({
    head: () => pageHead('/financing'),
    component: FinancingPage,
})
