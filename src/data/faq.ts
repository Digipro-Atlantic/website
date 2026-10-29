// Copy for the FAQ page, matched to the Figma frames (questions and group titles as designed).
// Answers come from the previous site copy; "Answer coming soon." marks questions the Figma has but the
// previous copy never answered.

export type FaqEntry = {
    question: string
    answer: string
}

export type FaqSection = {
    /** Anchor id used by the contents list. */
    id: string
    /** Heading shown above the questions. */
    title: string
    /** Label used in the contents list (Figma uses different casing from the heading). */
    contentsLabel: string
    items: FaqEntry[]
}

export const faqIntro = {
    label: 'Frequently asked questions',
    title: 'Common questions from owners, tenants, agencies and estates.',
    description:
        'Zebul is a property management platform built for the Nigerian market. Below are the questions we are asked most often, grouped by topic. If yours is not here, you can reach us through the support option in your portal.',
    contentsTitle: 'Contents',
} as const

export const faqHelp = {
    title: 'Still have questions?',
    description:
        "Can't find what you're looking for? Our support team is here to help.",
    // TODO: point at the real portal sign-in once its URL is decided.
    action: { label: 'Zebul Portal', to: '/contact' },
} as const

export const faqSections: FaqSection[] = [
    {
        id: 'about',
        title: 'About Zebul',
        contentsLabel: 'About Zebul',
        items: [
            {
                question: 'What is Zebul',
                answer: 'Zebul is a property management platform built for Nigeria and used online at zebul.ng. It keeps the everyday work of running property in one place: registering properties, managing tenants and leases, collecting rent, handling maintenance, storing documents, and tracking the money. Owners, agencies, tenants, estate committees, and lenders each sign in to their own secure area and see only what concerns them.',
            },
            {
                question: 'Who is Zebul for?',
                answer: "It is for everyone involved in a tenancy. That includes owners who manage their own properties, agencies managing on behalf of several owners, and tenants paying rent or raising requests. It covers higher institutions and private hostel operators running student accommodation, with billing that follows each institution's academic calendar. The tools each person sees are matched to the job they do.",
            },
            {
                question: 'What types of property can I manage on Zebul?',
                answer: 'Multi-unit residential buildings, student hostels billed by semester or session, commercial buildings, office complexes, market stalls and shopping plazas. Rent can be set on a daily, weekly, monthly, or per-session cycle, depending on the property.',
            },
            {
                question: 'Which management models does Zebul support?',
                answer: "Four of them. An owner can run everything directly. A professional agency can manage on the owner's behalf. An operator who both owns and manages can switch between the two, which we call hybrid management. And government or institutional bodies, such as university hostels, staff quarters and markets, can allocate housing in bulk on a fixed annual licence.",
            },
            {
                question: 'Is Zebul available outside Nigeria?',
                answer: 'Not at present. Zebul is built specifically for Nigeria: Naira pricing, local payment methods, Nigerian tax handling, and SMS across the major networks. Working outside the country is not part of the current plan.',
            },
        ],
    },
    {
        id: 'plans',
        title: 'Plans, Pricing and Access',
        contentsLabel: 'Plans, pricing and access',
        items: [
            {
                question: 'How much does Zebul cost?',
                answer: 'Owners and managers can start for free. The core tools, including rent collection and maintenance, cost nothing on the free plan. Paid tiers exist for those who want advanced reporting or higher unit limits, and the current prices are listed at zebul.ng/subscriptions.',
            },
            {
                question: 'If owners pay nothing, how does Zebul earn money?',
                answer: 'Mostly from activity on the platform rather than upfront charges. There is a small fee on transactions, shown to you before you confirm a payment. There are optional paid subscriptions. The full breakdown is at zebul.ng/fees.',
            },
            {
                question: 'Do I need to install an app?',
                answer: 'No. Zebul runs in a web browser on a phone, tablet, or computer. Dedicated mobile apps for owners, tenants, agencies, and field staff are coming in a later release.',
            },
            {
                question: 'Will Zebul work on a slow or unreliable connection?',
                answer: 'Yes. It is built for the network conditions common in Nigeria, with a low bandwidth mode and offline handling for the tasks that matter most. Important alerts also go out by SMS, and by WhatsApp if you have opted in, so a patchy data signal does not leave you in the dark.',
            },
            {
                question: 'How do I get started?',
                answer: 'Create an account at zebul.ng and complete the short registration for your user type, then add your properties or confirm your tenancy. Moving across from spreadsheets or paper records? Zebul has import tools and a guided setup, so you are not rekeying everything by hand.',
            },
        ],
    },
    {
        id: 'owners',
        title: 'For owners, agencies and managers',
        contentsLabel: 'For owners, agencies and managers',
        items: [
            {
                question: 'How does rent collection work?',
                answer: 'Tenants pay through the platform using one of the supported methods. Each payment is recorded against the right unit, a receipt is issued automatically, and your dashboard shows what has come in and what is still owed. Funds reach the owner or agency account according to how you have set things up.',
            },
            {
                question: 'Which payment methods are supported?',
                answer: 'Payments run through four established Nigerian processors: Paystack, Flutterwave, Remita, and Monnify. Between them they handle cards, bank transfers, and USSD. You will see the options available to you at checkout.',
            },
            {
                question:
                    'Can an agency manage properties for several owners at once?',
                answer: "Yes. One agency account can hold many client portfolios, each with its own reporting, automatic commission calculation, and staff assignments, and each owner's records stay separate from the rest. A management agreement records the services and the commission terms for every owner.",
            },
            {
                question: 'What is hybrid management?',
                answer: 'Some people both own property and manage it for others. Hybrid management lets one account switch between an owner view and a manager view while keeping the finances of each completely separate. Every switch is logged, so there is a clear record of which role you were acting in.',
            },
            {
                question: 'Can I bring my existing records into Zebul?',
                answer: 'Yes. There are tools to import property, unit, tenant, and lease records from common formats such as Excel, along with setup wizards that walk you through configuring the account.',
            },
        ],
    },
    {
        id: 'tenants',
        title: 'For Tenants',
        contentsLabel: 'For tenants',
        items: [
            {
                question: 'What can I do as a tenant on Zebul?',
                answer: 'Pay your rent, view your lease and documents, collect automatic receipts, raise maintenance requests and follow their progress, and get reminders before payments fall due. Your payment history stays with you in one place.',
            },
            {
                question: 'How do I pay my rent?',
                answer: 'Sign in, pick the payment, choose how you want to pay (card, bank transfer, or USSD through the supported processors), and confirm. Any fee is shown before you pay. Once the payment clears, you get a receipt.',
            },
            // TODO(content): no answer exists yet for this question.
            {
                question: 'What is the rental financing feature?',
                answer: 'Answer coming soon.',
            },
            // TODO(content): no answer exists yet for this question.
            { question: 'Is Zebul a lender?', answer: 'Answer coming soon.' },
            // TODO(content): no answer exists yet for this question.
            {
                question: 'What is the Zebul Payment Score?',
                answer: 'Answer coming soon.',
            },
            // TODO(content): no answer exists yet for this question.
            {
                question: 'Does a high score guarantee a loan?',
                answer: 'Answer coming soon.',
            },
        ],
    },
    {
        id: 'estates',
        title: 'For estates and unit owners',
        contentsLabel: 'For estates and unit owners',
        items: [
            // TODO(content): no answer exists yet for this question.
            {
                question: 'What does Zebul offer Estate Management Committees?',
                answer: 'Answer coming soon.',
            },
            // TODO(content): no answer exists yet for this question.
            {
                question:
                    "Does the committee see individual owners' private finances?",
                answer: 'Answer coming soon.',
            },
            // TODO(content): no answer exists yet for this question.
            {
                question: 'What does the estate portal cost?',
                answer: 'Answer coming soon.',
            },
        ],
    },
    {
        id: 'security',
        title: 'Security, data and compliance',
        contentsLabel: 'Security, data and compliance',
        items: [
            {
                question: 'Is my data safe on Zebul?',
                answer: "We take it seriously. Sensitive fields, meaning your NIN, BVN, and bank details, are encrypted in the database with AES-256. Passwords are hashed, never stored as plain text. Multi-factor authentication is required on every account. One organisation's data is walled off from another's, all traffic is encrypted in transit, and a permanent log records significant events. Independent security testing is run regularly.",
            },
            {
                question: 'Why does Zebul ask for my NIN and BVN?',
                answer: "To confirm you are who you say you are, through NIBSS. This protects everyone on the platform from fraud and impersonation. Once verified, the numbers are stored encrypted and are not visible even to Zebul's own administrators. They are handled in line with the Nigeria Data Protection Regulation.",
            },
            {
                question: 'What rights do I have over my data?',
                answer: 'Under the Nigeria Data Protection Regulation you can ask to see your data, correct mistakes in it, have it erased where the law allows, restrict how it is processed, or take it with you, and you can object to certain uses or withdraw consent. To make a request, email privacy@zebul.ng with your name and Zebul User ID. You can also raise a complaint with the Nigeria Data Protection Bureau.',
            },
            {
                question: 'Does Zebul sell my data or show advertisements?',
                answer: 'No. There is no advertising on Zebul, and no outside advertisers tracking you across it. Your information is used to run and improve the service, not sold to anyone.',
            },
            // TODO(content): no answer exists yet for this question.
            {
                question: 'Is rental financing regulated?',
                answer: 'Answer coming soon.',
            },
            {
                question: 'Who can use Zebul?',
                answer: 'Zebul is for people aged 18 and over. It is not meant for anyone under 18, and we do not knowingly collect their data.',
            },
        ],
    },
    {
        id: 'help',
        title: 'Getting Help',
        contentsLabel: 'Getting help',
        items: [
            {
                question: 'How do I get support?',
                answer: 'Use the support option inside your portal to raise a ticket and follow it through to resolution. Reminders and updates also reach you by SMS, and by WhatsApp if you have opted in.',
            },
        ],
    },
]
