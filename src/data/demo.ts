export const demo = {
    eyebrow: 'Talk to us',
    title: 'Tell us about the property you run.',
    lead: 'Zebul is still being built. This is not a product demo. It is a short conversation so we can understand your world, share what we are working on, and keep you close as we get closer to launch.',
    points: [
        {
            title: 'Honest about where we are',
            text: 'The platform is in development. We will not pretend otherwise.',
        },
        {
            title: 'A short conversation',
            text: 'A call or email exchange focused on your portfolio and the problems you deal with today.',
        },
        {
            title: 'Built with operators in mind',
            text: 'We want early signal from owners, agencies and institutions who manage property in Nigeria.',
        },
        {
            title: 'Useful either way',
            text: 'You get a clearer picture of the direction. We get sharper requirements. No sales script.',
        },
        {
            title: 'No pressure',
            text: 'Leave your details, ask questions, or say you simply want updates when we are ready.',
        },
    ],
    alt: 'Prefer email? Write to us at',
    formTitle: 'Start the conversation',
    submitLabel: 'Send my details',
    fineprint:
        'We reply within one business day. No obligation, and you can ask anything.',
    successTitle: 'Thank you',
    successBody:
        'Your message is on its way. We will reply within one business day.',
    successFallback:
        'If your email app did not open, send the details to info@zebul.ng and we will take it from there.',
    notesPlaceholder:
        'What you manage today, what is painful, or what you want to hear about as we build.',
    consentPrefix:
        'I agree to be contacted about this enquiry. We use your details only to follow up, in line with our',
    emailSubjectPrefix: 'Early interest',
    roles: [
        'Property owner',
        'Property management agency',
        'Institutional or government landlord',
        'Prospective partner',
        'Tenant',
        'Other',
    ],
    portfolioSizes: [
        'Just one',
        '2 to 25',
        '26 to 100',
        'Over 100',
        'Not sure yet',
    ],
    preferredTimes: [
        'No preference',
        'Weekday morning',
        'Weekday afternoon',
        'Weekend',
    ],
} as const

export const partnerRole = 'Prospective partner' as const
