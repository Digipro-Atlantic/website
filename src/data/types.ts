export type NavLink = {
    label: string
    to: string
    external?: boolean
}

export type EcoCard = {
    title: string
    description: string
    cta: string
    to: string
}

export type BillingPeriod = 'monthly' | 'annual'

export type TierPricing = {
    monthly: string
    annual: string
    unitM: string
    unitA: string
    noteM: string
    noteA: string
    units: string
}

export type PricingTierId =
    'freemium' | 'essential' | 'professional' | 'enterprise'

export type PricingTier = {
    id: PricingTierId
    name: string
    description: string
    featured?: boolean
    cta: { label: string; to: string; variant: 'gold' | 'dark' | 'outline' }
    features: string[]
}

export type FeeRow =
    | {
          name: string
          rateKey: 'transaction' | 'assessment' | 'vat'
          appliedTo: string
      }
    | {
          name: string
          rate: string
          appliedTo: string
      }

export type FaqItem = {
    question: string
    answer: string
}

export type FaqGroup = {
    category: string
    items: FaqItem[]
}
