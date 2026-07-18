import type { FaqGroup } from './types'

export const faqGroups: FaqGroup[] = [
    {
        category: 'About Zebul',
        items: [
            {
                question: 'What is Zebul?',
                answer: 'Zebul is a property management platform built for Nigeria and used online at zebul.ng. It keeps the everyday work of running property in one place: registering properties, managing tenants and leases, collecting rent, handling maintenance, storing documents, and tracking the money. Owners, agencies and tenants each sign in to their own secure area and see only what concerns them.',
                // Soft-launch (previous):
                // '... Owners, agencies, tenants, estate committees, and lenders each sign in...'
            },
            {
                question: 'Who is Zebul for?',
                answer: "It is for everyone involved in a tenancy. That includes owners who manage their own properties, agencies managing on behalf of several owners, and tenants paying rent or raising requests. It covers higher institutions and private hostel operators running student accommodation, with billing that follows each institution's academic calendar. The tools each person sees are matched to the job they do.",
                // Soft-launch (previous):
                // '... It also covers the elected committees that run gated and planned estates... and financial institutions... that offer rental financing.'
            },
            {
                question: 'What types of property can I manage on Zebul?',
                answer: 'Multi-unit residential buildings, student hostels billed by semester or session, commercial buildings, office complexes, market stalls and shopping plazas. Rent can be set on a daily, weekly, monthly, or per-session cycle, depending on the property.',
                // Soft-launch (previous):
                // '... and gated or planned residential estates run by committees.'
            },
            {
                question: 'Which management models does Zebul support?',
                answer: "Four of them. An owner can run everything directly. A professional agency can manage on the owner's behalf. An operator who both owns and manages can switch between the two, which we call hybrid management. And government or institutional bodies, such as university hostels, staff quarters and markets, can allocate housing in bulk on a fixed annual licence.",
                // Soft-launch (previous):
                // "Five of them. ... A gated estate can be run by an elected committee..."
            },
            {
                question: 'Is Zebul available outside Nigeria?',
                answer: 'Not at present. Zebul is built specifically for Nigeria: Naira pricing, local payment methods, Nigerian tax handling, and SMS across the major networks. Working outside the country is not part of the current plan.',
            },
        ],
    },
    {
        category: 'Plans, pricing and access',
        items: [
            {
                question: 'How much does Zebul cost?',
                answer: 'Owners and managers can start for free. The core tools, including rent collection and maintenance, cost nothing on the free plan. Paid tiers exist for those who want advanced reporting or higher unit limits, and the current prices are listed at zebul.ng/subscriptions.',
                // Soft-launch (previous): '... advanced reporting, lending tools, or higher unit limits...'
            },
            {
                question: 'If owners pay nothing, how does Zebul earn money?',
                answer: 'Mostly from activity on the platform rather than upfront charges. There is a small fee on transactions, shown to you before you confirm a payment. There are optional paid subscriptions. The full breakdown is at zebul.ng/fees.',
                // Soft-launch (previous):
                // '... A fee applies when a tenant submits a rental financing application. And in estates, a digital management fee...'
            },
            {
                question: 'Do I need to install an app?',
                answer: 'No. Zebul runs in a web browser on a phone, tablet, or computer. Dedicated mobile apps for owners, tenants, agencies, and field staff are coming in a later release.',
                // Soft-launch (previous):
                // '... Committee members can add the estate portal to their home screen...'
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
        category: 'For owners, agencies and managers',
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
        category: 'For tenants',
        items: [
            {
                question: 'What can I do as a tenant on Zebul?',
                answer: 'Pay your rent, view your lease and documents, collect automatic receipts, raise maintenance requests and follow their progress, and get reminders before payments fall due. Your payment history stays with you in one place.',
                // Soft-launch (previous):
                // '... Where it is offered, you can also apply for rental financing.'
            },
            {
                question: 'How do I pay my rent?',
                answer: 'Sign in, pick the payment, choose how you want to pay (card, bank transfer, or USSD through the supported processors), and confirm. Any fee is shown before you pay. Once the payment clears, you get a receipt.',
            },
            // Soft-launch: hidden until rent financing is ready
            // {
            //     question: 'What is the rental financing feature?',
            //     answer: 'It connects tenants who need help with advance or yearly rent to financial institutions that offer short-term rental loans...',
            // },
            // {
            //     question: 'Is Zebul a lender?',
            //     answer: 'No. Zebul does not lend money...',
            // },
            // {
            //     question: 'What is the Zebul Payment Score?',
            //     answer: 'It is a number between 0 and 100...',
            // },
            // {
            //     question: 'Does a high score guarantee a loan?',
            //     answer: 'No. A high score is not a promise of approval...',
            // },
        ],
    },
    // Soft-launch: hidden until Community-Governed Estate Module is ready
    // {
    //     category: 'For estates and unit owners',
    //     items: [
    //         {
    //             question: 'What does Zebul offer Estate Management Committees?',
    //             answer: 'The tools an elected committee needs to run an estate...',
    //         },
    //         {
    //             question:
    //                 "Does the committee see individual owners' private finances?",
    //             answer: 'No, and this matters...',
    //         },
    //         {
    //             question: 'What does the estate portal cost?',
    //             answer: 'Nothing directly...',
    //         },
    //     ],
    // },
    {
        category: 'Security, data and compliance',
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
            // Soft-launch: hidden until rent financing is ready
            // {
            //     question: 'Is rental financing regulated?',
            //     answer: 'The institutions that lend through Zebul are licensed by the Central Bank of Nigeria...',
            // },
            {
                question: 'Who can use Zebul?',
                answer: 'Zebul is for people aged 18 and over. It is not meant for anyone under 18, and we do not knowingly collect their data.',
            },
        ],
    },
    {
        category: 'Getting help',
        items: [
            {
                question: 'How do I get support?',
                answer: 'Use the support option inside your portal to raise a ticket and follow it through to resolution. Reminders and updates also reach you by SMS, and by WhatsApp if you have opted in.',
            },
        ],
    },
]
