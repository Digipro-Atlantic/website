import type { FeeRow, PricingTier, TierPricing } from './types'

export const tierPricing: Record<string, TierPricing> = {
    freemium: {
        monthly: '₦0',
        annual: '₦0',
        unitM: '/forever',
        unitA: '/forever',
        noteM: 'No card required',
        noteA: 'No card required',
        units: 'Unlimited units',
    },
    essential: {
        monthly: '₦2,500',
        annual: '₦25,000',
        unitM: '/month',
        unitA: '/year',
        noteM: '₦25,000 billed yearly',
        noteA: 'Equivalent to ₦2,083/month',
        units: 'Up to 25 units',
    },
    professional: {
        monthly: '₦6,250',
        annual: '₦62,500',
        unitM: '/month',
        unitA: '/year',
        noteM: '₦62,500 billed yearly',
        noteA: 'Equivalent to ₦5,208/month',
        units: 'Up to 100 units',
    },
    enterprise: {
        monthly: '₦15,000',
        annual: '₦150,000',
        unitM: '/month',
        unitA: '/year',
        noteM: '₦150,000 billed yearly',
        noteA: 'Equivalent to ₦12,500/month',
        units: 'Unlimited units',
    },
}

export const fees = {
    transaction: '1.5%',
    assessment: '₦500 to ₦2,000',
    vat: '7.5%',
} as const

export const pricingTiers: PricingTier[] = [
    {
        id: 'freemium',
        name: 'Freemium',
        description: 'For individual landlords getting started.',
        cta: { label: 'Start free', to: '/demo', variant: 'outline' },
        features: [
            'Rent collection and receipts',
            'Maintenance tracking',
            'Tenant and lease records',
            'Tenant rent financing facilitation',
            'WhatsApp and SMS notices',
        ],
    },
    {
        id: 'essential',
        name: 'Essential',
        description: 'For small portfolios that need reporting.',
        cta: { label: 'Choose Essential', to: '/demo', variant: 'outline' },
        features: [
            'Everything in Freemium',
            'Basic financial reporting',
            'Expense categorisation',
            'Document vault',
        ],
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'For growing owners and small agencies.',
        featured: true,
        cta: { label: 'Choose Professional', to: '/demo', variant: 'dark' },
        features: [
            'Everything in Essential',
            'Advanced reporting and analytics',
            'Multi-property comparison',
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For agencies managing at scale.',
        cta: { label: 'Talk to sales', to: '/demo', variant: 'outline' },
        features: [
            'Everything in Professional',
            'Custom workflows',
            'Priority support',
            'Full agency and staff hierarchy',
        ],
    },
]

export const institutionalBand = {
    title: 'Government and institutional clients',
    description:
        'Government housing agencies, military and paramilitary quarters, universities and hospitals, corporate and embassy housing, and market administrators run on a fixed annual licence with allocation workflows and compliance reporting, rather than per-unit pricing.',
    cta: { label: 'Request a licence', to: '/demo' },
}

export const feeRows: FeeRow[] = [
    {
        name: 'Transaction fee',
        rateKey: 'transaction',
        appliedTo: 'Each rent payment processed through Zebul',
    },
    {
        name: 'Loan assessment fee',
        rateKey: 'assessment',
        appliedTo: 'Each tenant rent financing application, non-refundable',
    },
    {
        name: 'Service charge',
        rate: 'Set by the owner or EMC',
        appliedTo: 'Tenant invoices, where applied',
    },
    {
        name: 'Feature charge',
        rate: 'Per feature',
        appliedTo: 'One-time activation of a premium feature',
    },
]

export const feesNote =
    'Value Added Tax at {vat} applies to Zebul fees only, not to the rent or principal amount. Full fee terms are published at zebul.ng/fees.'
