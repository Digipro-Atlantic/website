export const financingHero = {
    label: 'Tenant rent financing',
    title: 'Annual rent, paid up front, repaid monthly.',
    description:
        'In Nigeria, rent is usually demanded a year in advance, sometimes two. That lump sum is the hard part. Zebul connects tenants to licensed financial institutions that can fund it, so the tenant pays monthly while the landlord is still paid in full, up front.',
} as const

/** Position of a step on the curve, in the Figma frame's px: text top-left and node centre. */
type StepPlacement = {
    x: number
    y: number
    cx: number
    cy: number
}

export type FinancingFlowStep = {
    title: string
    description: string
    /** Text column width from Figma, the same on tablet and desktop. */
    width: number
    tablet: StepPlacement
    desktop: StepPlacement
}

export const financingFlow: readonly FinancingFlowStep[] = [
    {
        title: 'Tenant applies',
        width: 214,
        description:
            'The tenant chooses a financial institution partner and submits an application through Zebul.',
        tablet: { x: 621, y: 471.5, cx: 588, cy: 550 },
        desktop: { x: 1045, y: 644.3, cx: 1003, cy: 745 },
    },
    {
        title: 'Assessment built',
        width: 201,
        description:
            "Zebul builds an advisory assessment from the tenant's rent record on the platform",
        tablet: { x: 394, y: 623.5, cx: 495, cy: 734 },
        desktop: { x: 814, y: 814.3, cx: 895, cy: 945 },
    },
    {
        title: 'FI decides',
        width: 185,
        description:
            'The institution runs its own independent credit assessment and approves, declines or counter-offers.',
        tablet: { x: 72, y: 724.5, cx: 255, cy: 828 },
        desktop: { x: 386, y: 948.3, cx: 613, cy: 1045 },
    },
    {
        title: 'Landlord paid',
        width: 241,
        description:
            "On approval, the institution sends the funds directly to the landlord's bank account. Never to the tenant.",
        tablet: { x: 425, y: 887.5, cx: 400, cy: 990 },
        desktop: { x: 772, y: 1121.3, cx: 800, cy: 1252 },
    },
    {
        title: 'Tenant repays',
        width: 241,
        description:
            'The tenant repays the institution each month under a separate loan agreement they sign with the FI.',
        tablet: { x: 674, y: 986.5, cx: 667, cy: 1089 },
        desktop: { x: 1102, y: 1234.3, cx: 1128, cy: 1365 },
    },
]

export const financingBoundaries = {
    label: 'Boundaries and signal',
    title: 'What Zebul is, and what it measures.',
    role: {
        title: 'Zebul’s role is fixed and limited',
        description:
            'Zebul is a technology facilitator and a non-exclusive referral agent. Zebul is not a lender, co-obligor, guarantor or credit assessor. It holds no lending licence, never disburses funds and is never a party to the loan agreement. The financial institution holds the credit relationship and carries all credit risk, including any default.',
        note: 'Funds flow from bank to landlord. The tenant repays the bank. Zebul charges a one-time, non-refundable assessment fee on each application to cover identity verification and the assessment.',
    },
    score: {
        title: 'The Zebul Payment Score',
        badge: 'Advisory',
        value: '0 to 100',
        caption: 'Generated at application',
        description:
            'It starts with the tenant’s rent payment conduct on Zebul, the internal record, and, with the tenant’s consent, adds third-party assessment such as bank statement analysis from licensed data services. The combined assessment is what Zebul sends to the institution. It is advisory, non-binding and indicative. It is not a credit rating, a credit bureau score or a recommendation. A high score does not guarantee approval, and a low score does not prevent it. The institution sets its own threshold and makes the decision.',
    },
} as const
