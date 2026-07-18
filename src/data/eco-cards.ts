import type { EcoCard } from './types'

export const ecoCards: EcoCard[] = [
    {
        title: 'The platform',
        description:
            'Rent, leases, maintenance, documents, reporting, and the marketplace and apps around them.',
        cta: 'See capabilities',
        to: '/platform',
    },
    {
        title: 'See it in action',
        description:
            'A visual tour of the dashboards, the tenant app and day-to-day property workflows.',
        cta: 'Take the tour',
        to: '/tour',
    },
    // Soft-launch: hidden until product is ready
    // {
    //     title: 'Rent financing',
    //     description:
    //         "How tenants spread yearly rent while landlords are paid in full, and where Zebul's role ends.",
    //     cta: 'How financing works',
    //     to: '/financing',
    // },
    // {
    //     title: 'Estates',
    //     description:
    //         'The Community-Governed Estate Module for elected committees and unit owners.',
    //     cta: 'For estates',
    //     to: '/estates',
    // },
    {
        title: 'Institutions',
        description:
            'Government, university, hospital, corporate and market housing on a fixed annual licence.',
        cta: 'For institutions',
        to: '/institutions',
    },
    // Soft-launch: hidden until product is ready
    // {
    //     title: 'Pricing',
    //     description:
    //         'Free to start for owners, with paid tiers as a portfolio grows.',
    //     cta: 'See pricing',
    //     to: '/pricing',
    // },
    {
        title: 'Questions',
        description:
            'Common questions from owners, tenants, agencies and institutions.',
        cta: 'Read the FAQ',
        to: '/faq',
    },
]
