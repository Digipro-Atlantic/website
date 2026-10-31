import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '@/data/seo'
import { PricingPage } from '@/containers/Pricing'

export const Route = createFileRoute('/pricing')({
    head: () => pageHead('/pricing'),
    component: PricingPage,
})
