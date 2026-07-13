export type NavLink = {
    label: string
    to: string
    external?: boolean
    hash?: string
    hide?: boolean
}

export type ProductMenuIconId = 'property-management' | 'tour'

export type ProductMenuLink = {
    id: string
    label: string
    description: string
    to: string
    icon: ProductMenuIconId
}

export type EcoCard = {
    title: string
    description: string
    cta: string
    to: string
}

export type StatementPoint = {
    number: string
    title: string
    description: string
}

export type ModelCard = {
    tag: string
    title: string
    description: string
    features: readonly string[]
    wide?: boolean
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

export type CapabilityIconId =
    | 'rent-collection'
    | 'lease-management'
    | 'maintenance'
    | 'document-vault'
    | 'financial-reporting'
    | 'communications'

export type EcosystemIconId = 'marketplace' | 'integrations' | 'mobile'

export type PlatformCapability = {
    id: string
    title: string
    description: string
    icon: CapabilityIconId
}

export type PlatformEcosystemCard = {
    id: string
    title: string
    description: string
    icon: EcosystemIconId
}

export type TourScreenId =
    | 'dashboard'
    | 'payments'
    | 'tenant-portal'
    | 'estate-ledger'
    | 'financing'
    | 'reporting'

export type TourMockType = 'browser' | 'phone'

export type TourStep = {
    id: TourScreenId
    stepLabel: string
    title: string
    description: string
    bullets: readonly string[]
    mockType: TourMockType
    url?: string
    flip?: boolean
    screen: TourScreenId
}

export type FinancingStep = {
    number: number
    title: string
    description: string
}

export type FinancingCard = {
    id: string
    title: string
    titlePill?: string
    score?: { value: string; label: string }
    paragraphs: readonly string[]
    disclaimer?: string
}

export type EstateFeature = {
    id: string
    title: string
    description: string
}

export type SecGridItem = {
    id: string
    tag: string
    title: string
    description: string
}
