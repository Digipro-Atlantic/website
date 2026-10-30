import type { NavLink } from './types'

export type BillingPeriod = 'monthly' | 'annual'

export type PricingTierId = 'free' | 'essential' | 'pro' | 'enterprise'

export type PricingTier = {
    id: PricingTierId
    name: string
    description: string
    /** Monthly price in naira; 0 means free forever. */
    monthly: number
    featured?: boolean
    cta: NavLink
    /** Label of the CTA inside the comparison table header (Figma casing differs). */
    tableCtaLabel: string
    limit: string
    features: readonly string[]
}

export const pricingHero = {
    label: 'Pricing',
    title: 'Clear tiers for owners, agencies and institutions.',
    description:
        'Owners can start free forever. Subscription tiers add capacity and capability as a portfolio grows. Tenants are never charged a subscription. Tenant rent financing facilitation is included on every tier, including Freemium. All figures are in Naira and exclude VAT, which applies to Zebul fees only.',
} as const

export const billingOptions = [
    { id: 'monthly', label: 'Monthly' },
    { id: 'annual', label: 'Annual', chip: '+ 2 Month' },
] as const

export const pricingTiers: readonly PricingTier[] = [
    {
        id: 'free',
        name: 'Free',
        description: 'For individual landlords getting started.',
        monthly: 0,
        cta: { label: 'Start Free', to: '/demo' },
        tableCtaLabel: 'Start free',
        limit: 'Unlimited units',
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
        monthly: 6000,
        cta: { label: 'Choose Essential', to: '/demo' },
        tableCtaLabel: 'Choose Essential',
        limit: 'Up to 25 units',
        features: [
            'Everything in Freemium',
            'Basic financial reporting',
            'Expense categorisation',
            'Document vault',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        description: 'For growing owners and small agencies.',
        monthly: 16000,
        featured: true,
        cta: { label: 'Choose Pro', to: '/demo' },
        tableCtaLabel: 'Choose Pro',
        limit: 'Up to 100 units',
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
        monthly: 45000,
        cta: { label: 'Talk to sales', to: '/contact' },
        tableCtaLabel: 'Talk to sales',
        limit: 'Unlimited units',
        features: [
            'Everything in Professional',
            'Custom workflows',
            'Priority support',
            'Full agency and staff hierarchy',
        ],
    },
]

/** Yearly billing is ten times the monthly price ("two months free"). */
const ANNUAL_MULTIPLIER = 10

const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-US')}`

export type TierPrice = {
    /** Big figure, e.g. "₦6,000" or "Free". */
    amount: string
    /** Suffix after the figure, e.g. "/month". Empty for the free tier. */
    unit: string
    /** First billing note under the price. */
    billed: string
    /** Second, smaller billing note. */
    note: string
    /** Compact "price/unit" line used in the comparison table header. */
    tableLine: string
    /** Small line under the price in the comparison table header. */
    tableNote: string
}

export const getTierPrice = (
    tier: PricingTier,
    period: BillingPeriod,
): TierPrice => {
    if (tier.monthly === 0) {
        return {
            amount: 'Free',
            unit: '',
            billed: 'Free forever',
            note: 'No card required',
            tableLine: '₦0/Forever',
            tableNote: 'No card required',
        }
    }

    const annual = period === 'annual'
    const amount = formatNaira(
        annual ? tier.monthly * ANNUAL_MULTIPLIER : tier.monthly,
    )
    const unit = annual ? '/year' : '/month'

    return {
        amount,
        unit,
        billed: annual ? 'Billed yearly, two months free' : 'Billed monthly',
        note: 'Excluding VAT, added at checkout',
        tableLine: `${amount}${unit}`,
        tableNote: 'Excluding VAT',
    }
}

export const comparison = {
    label: 'Plan comparison',
    title: 'Compare all features.',
    description: 'Every plan and what it includes, side by side.',
    tableTitle: 'Compare plans',
    tableDescription: "Complete feature list and what's included in each tier.",
} as const

export type ComparisonRow = {
    feature: string
    /** One value per tier, in the order of `pricingTiers`. "\n" forces a line break. */
    values: readonly [string, string, string, string]
    /** Plain-weight values ("Pay as you go", "₦1,000 each time") vs medium-weight status words. */
    detail?: boolean
}

const yes = ['Yes', 'Yes', 'Yes', 'Yes'] as const
const proUp = ['Not included', 'Not included', 'Yes', 'Yes'] as const

export const comparisonRows: readonly ComparisonRow[] = [
    { feature: 'Everything needed to run tenancies', values: yes },
    {
        feature: 'Pooled 30 SMS and 30 WhatsApp per property a year',
        values: yes,
    },
    { feature: 'Identity verification on every tenant', values: yes },
    {
        feature: 'Identity verification for owners and managers',
        values: ['Free', 'Free', 'Free', 'Free'],
    },
    { feature: 'All safety and security features', values: yes },
    {
        feature: 'Reports and analytics',
        values: ['Not included', 'Basic', 'Full', 'Full'],
    },
    {
        feature: 'Year-end pack for the accountant',
        values: ['Not included', 'Not included', 'Yes', 'Yes'],
    },
    {
        feature: 'Documents with version history',
        values: [
            '250 MB per property,\nminimum 2 GB',
            '1 GB per property,\nminimum 15 GB',
            '2 GB per property,\nminimum 50 GB',
            'Negotiated',
        ],
    },
    { feature: 'Saved and scheduled reports', values: proUp },
    { feature: 'Portfolio comparison and executive view', values: proUp },
    { feature: 'Bulk export and accounting integration', values: proUp },
    { feature: 'White-labelling and client branding', values: proUp },
    {
        feature: 'Extra messaging allowance',
        values: ['Pay as you go', '1.5× pooled', '2× pooled', '4× pooled'],
        detail: true,
    },
    {
        feature: "Owner's logo on invoices and receipts",
        values: ['Not included', 'Yes', 'Yes', 'Yes'],
    },
    {
        feature: 'Re-verification of a payout or settlement account',
        values: [
            '₦1,000 each time',
            '₦1,000 each time',
            '₦1,000 each time',
            'Included',
        ],
        detail: true,
    },
    {
        feature: 'API and webhook access',
        values: ['Not included', 'Not included', 'Not included', 'Yes'],
    },
    { feature: 'Migration from an old system', values: proUp },
    { feature: 'Multiple entities under one account', values: proUp },
    {
        feature: "Export of a single property's records",
        values: ['Not included', 'Yes', 'Yes', 'Yes'],
    },
    {
        feature: 'Dedicated support contact',
        values: ['Not included', 'Not included', 'Not included', 'Yes'],
    },
]

export const pricingNotes = [
    'Prices exclude VAT. Yearly billing is ten times the monthly price, so a year paid up front carries two months free.',
    'No charge per user, per unit or per client on any plan.',
    'The Free plan is free for life. It is not a trial and it does not expire. Premium features and additional services are optional. Safety and security features are included on every plan.',
    'Messages beyond the pooled allowance are charged to the owner or agency that sends them.',
    'Document storage is pooled across all properties on the account, and every saved version counts. When the allowance is reached, new uploads pause; documents already stored remain viewable and downloadable, and nothing is deleted.',
    'Identity and account checks are carried out by third-party services, so they carry a fee. Verification for property owners and managers is free.',
    'Tenants pay ₦1,000 for their own identity verification when they complete their KYC.',
    'Each re-verification of a payout or settlement account costs ₦1,000, paid by the person carrying it out, and is included on Enterprise.',
    "Payments made through Zebul carry a Zebul platform fee, paid by whoever initiates the payment. VAT applies to Zebul's fees, not to rent.",
    'Estate management committees use Zebul at no direct cost.',
    'Pricing for government and institutional housing bodies is discussed and agreed separately.',
] as const

export const additionalFees = {
    title: 'Additional Fees',
    description:
        'Transparent charges that apply when you use specific Zebul services.',
    columns: ['Fee', 'Amount', 'Paid by'],
    rows: [
        {
            fee: 'Zebul platform fee',
            amount: '1.5% of the payment, minimum ₦500, maximum ₦9,500 per payment, plus VAT',
            paidBy: 'Whoever initiates the payment, usually the tenant',
        },
        {
            fee: 'Tenant identity verification',
            amount: '₦1,000',
            paidBy: 'The tenant, at KYC',
        },
        {
            fee: 'Re-verification of a payout or settlement account',
            amount: '₦1,000 each time (included on Enterprise)',
            paidBy: 'The person carrying it out',
        },
        {
            fee: 'Messages beyond the pooled allowance',
            amount: 'Pay as you go',
            paidBy: 'The owner or agency that sends them',
        },
    ],
    vatNote:
        'Value Added Tax at 7.5% applies to Zebul fees only, not to the rent or principal amount. Full fee terms are published at zebul.ng/fees.',
} as const

export const institutionalBand = {
    title: 'Government and institutional clients',
    description:
        'Government housing agencies, military and paramilitary quarters, universities and hospitals, corporate and embassy housing, and market administrators run on a fixed annual licence with allocation workflows and compliance reporting, rather than per-unit pricing.',
    cta: { label: 'Request a License', to: '/contact' },
} as const
