import type { FinancingCard, FinancingStep } from './types'

export const financingSection = {
    eyebrow: 'Tenant rent financing',
    title: 'Annual rent, paid up front, repaid monthly.',
    description:
        'In Nigeria, rent is usually demanded a year in advance, sometimes two. That lump sum is the hard part. Zebul connects tenants to licensed financial institutions that can fund it, so the tenant pays monthly while the landlord is still paid in full, up front.',
} as const

export const financingSteps: readonly FinancingStep[] = [
    {
        number: 1,
        title: 'Tenant applies',
        description:
            'The tenant chooses a financial institution partner and submits an application through Zebul.',
    },
    {
        number: 2,
        title: 'Assessment built',
        description:
            "Zebul builds an advisory assessment from the tenant's rent record on the platform and, with consent, third-party checks such as bank statement analysis.",
    },
    {
        number: 3,
        title: 'FI decides',
        description:
            'The institution runs its own independent credit assessment and approves, declines or counter-offers.',
    },
    {
        number: 4,
        title: 'Landlord paid',
        description:
            "On approval, the institution sends the funds directly to the landlord's bank account. Never to the tenant.",
    },
    {
        number: 5,
        title: 'Tenant repays',
        description:
            'The tenant repays the institution each month under a separate loan agreement they sign with the FI.',
    },
]

export const financingCards: readonly FinancingCard[] = [
    {
        id: 'role',
        title: "Zebul's role is fixed and limited",
        paragraphs: [
            'Zebul is a technology facilitator and a non-exclusive referral agent. Zebul is not a lender, co-obligor, guarantor or credit assessor. It holds no lending licence, never disburses funds and is never a party to the loan agreement. The financial institution holds the credit relationship and carries all credit risk, including any default.',
        ],
        disclaimer:
            'Funds flow from bank to landlord. The tenant repays the bank. Zebul charges a one-time, non-refundable assessment fee on each application to cover identity verification and the assessment.',
    },
    {
        id: 'score',
        title: 'The Zebul Payment Score',
        titlePill: 'Advisory',
        score: {
            value: '0 to 100',
            label: 'generated at application',
        },
        paragraphs: [
            "It starts with the tenant's rent payment conduct on Zebul, the internal record, and, with the tenant's consent, adds third-party assessment such as bank statement analysis from licensed data services. The combined assessment is what Zebul sends to the institution. It is advisory, non-binding and indicative. It is not a credit rating, a credit bureau score or a recommendation. A high score does not guarantee approval, and a low score does not prevent it. The institution sets its own threshold and makes the decision.",
        ],
    },
]
