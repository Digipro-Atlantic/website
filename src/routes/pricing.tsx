import { createFileRoute } from '@tanstack/react-router'
import { PricingPage } from '@/containers/Pricing'

export const Route = createFileRoute('/pricing')({
    component: PricingPage,
})
