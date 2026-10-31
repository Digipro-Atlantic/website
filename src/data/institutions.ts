// The hero lead and card copy are the Figma copy as designed. The lead is a
// placeholder shared with the Estates page and the card titles and bodies
// repeat the Platform cards. Pending client copy.
export const institutionsHero = {
    label: 'Bulk and institutional housing',
    title: 'For organisations that house people at scale.',
    description:
        'Most Nigerian landlords and agencies still run on spreadsheets, paper receipts and a busy WhatsApp group. Zebul puts all of it in one place: every property, tenancy, payment and document, reachable on any phone, even on a slow connection.',
} as const

export const institutionItems = [
    {
        id: 'allocations',
        category: 'Allocations',
        title: 'Rent collection',
        description:
            'Process rent through Paystack, Flutterwave, Remita and Monnify. Receipts and payment history are generated for every transaction.',
    },
    {
        id: 'student-housing',
        category: 'Student housing',
        title: 'Lease management',
        description:
            'Create leases from templates, capture digital signatures with OTP verification, and handle renewals with side-by-side term comparison.',
    },
    {
        id: 'multi-institution',
        category: 'Multi - Institution',
        title: 'Maintenance tracking',
        description:
            'Tenants raise requests, owners approve, work orders run to completion. Every job and its cost is recorded against the unit.',
    },
    {
        id: 'guardian-access',
        category: 'Guardian access',
        title: 'Document vault',
        description:
            'Leases, receipts and inspection reports stored with version control, retention policies and access controls aligned to NDPR.',
    },
    {
        id: 'markets',
        category: 'Markets',
        title: 'Financial reporting',
        description:
            'Income against expenditure, occupancy-based analysis, owner disbursement tracking and period comparison, exportable on demand.',
    },
    {
        id: 'compliance',
        category: 'Compliance',
        title: 'Communications',
        description:
            'Reach tenants and residents on WhatsApp and SMS, both treated as primary channels, with in-app messages and bulk announcements when you need them.',
    },
] as const
