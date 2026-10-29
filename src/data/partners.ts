export const partners = {
    hero: {
        label: 'Partners',
        title: 'Build with Zebul.',
        description:
            'Zebul works with the institutions and businesses around a tenancy: lenders, estate bodies, service providers and platforms. Tell us where you fit and we will route you to the right person.',
    },
    cards: [
        {
            title: 'Estate associations and developers',
            text: "Bring your estates onto Zebul's governance tools at zero direct cost to committees or owners, and give every unit one place for dues and records.",
        },
        {
            title: 'Service providers',
            text: 'Join the marketplace to receive work orders from owners, agencies and estates, deliver against them, and invoice through Zebul.',
        },
        {
            title: 'Integration and data partners',
            text: "Listing platforms, accounting tools and data services connect through Zebul's API, published at zebul.ng/integrations.",
        },
    ],
    lending: {
        label: 'Financial institutions',
        title: 'Lend against rent, with the decision yours',
        description:
            'Zebul routes pre-assessed rental loan applications to you and shares an advisory assessment built from on-platform records and, with consent, third-party data.',
        loanLabel: 'Current Loan Amount',
        loanAmount: '₦ 1,000,000',
        blockTitle: 'Pre-assessed rental loan applications',
        blockText:
            'You run your own credit decision, set your own terms, and disburse directly to the landlord. You hold the relationship and the risk. Zebul is a facilitator, not a lender.',
        checklist: [
            'Register properties, units and lease terms',
            'Collect rent and issue receipts automatically',
            'Approve maintenance and track every expense',
            'Free forever for owners on the starter tier',
        ],
    },
    enquiry: {
        label: 'Partner Enquiry',
        title: 'Tell us about your organisation.',
        description:
            'Send us a few details and the partnerships team will be in touch.',
        partnerTypes: [
            'Financial institution',
            'Estate association or developer',
            'Service provider',
            'Integration or data partner',
            'Other',
        ],
        submitLabel: 'Send Enquiry',
        fineprint: 'We reply within two business days.',
        emailSubjectPrefix: 'Partner enquiry',
        successTitle: 'Enquiry received',
        successBody:
            'Thank you. The partnerships team will be in touch within two business days.',
    },
} as const
