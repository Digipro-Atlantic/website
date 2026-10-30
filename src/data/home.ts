import dashboardAgency from '@/assets/home/hero-dashboard-agency.webp'
import dashboardOwner from '@/assets/home/hero-dashboard-owner.webp'
import dashboardTenant from '@/assets/home/hero-dashboard-tenant.webp'
import logoAmazonStudios from '@/assets/home/logo-amazon-studios.png'
import logoAp from '@/assets/home/logo-ap.png'
import logoFramework from '@/assets/home/logo-framework.png'
import logoLionsgate from '@/assets/home/logo-lionsgate.png'
import logoRevlon from '@/assets/home/logo-revlon.png'
import servesAgencies from '@/assets/home/serves-agencies.png'
import servesEstates from '@/assets/home/serves-estates.png'
import servesHybrid from '@/assets/home/serves-hybrid.png'
import servesInstitutional from '@/assets/home/serves-institutional.png'
import servesOwners from '@/assets/home/serves-owners.png'
import type { NavLink } from './types'
import { isPreviewOnlyPath } from './visibility'

export const hero = {
    // Split where Figma breaks the lines: the eyebrow wraps on mobile only, the title at every size.
    eyebrow: ['Property management, built for Nigeria,', 'built for you'],
    title: ['Run every property, estate and', 'rent payment from one place.'],
    emailPlaceholder: 'Your Email',
    cta: { label: 'Book a Demo', to: '/demo' },
    // Figma "Main Hero Dashboards" (10592:33830), 2x exports cycled in the hero.
    dashboardsLabel:
        'Zebul dashboards for a tenant, a property owner and an agency',
    dashboards: [
        {
            id: 'tenant',
            src: dashboardTenant,
            width: 2727,
            height: 1992,
            // Export includes the drop-shadow margin; crop to the 2656×1888 card at 35,4.
            className: 'top-[-0.212%] left-[-1.318%] w-[102.673%]',
        },
        {
            id: 'owner',
            src: dashboardOwner,
            width: 2656,
            height: 1888,
            className: 'top-0 left-0 w-full',
        },
        {
            id: 'agency',
            src: dashboardAgency,
            width: 2656,
            height: 1888,
            className: 'top-0 left-0 w-full',
        },
    ],
} as const

// TODO(content): these are the placeholder brands from the Figma file.
// Replace with real customers/partners before launch — do not ship as-is.
export const trustedBy = {
    title: 'Trusted By Leading Brands & Professionals',
    // `className` sizes each logo: tablet/mobile width, then desktop width.
    logos: [
        {
            name: 'Revlon',
            src: logoRevlon,
            className: 'w-[122px] xl:w-[165px]',
        },
        {
            name: 'Lionsgate',
            src: logoLionsgate,
            className: 'w-[163px] xl:w-[220px]',
        },
        {
            name: 'Associated Press',
            src: logoAp,
            className: 'w-[178px] xl:w-[220px]',
        },
        {
            name: 'Amazon Studios',
            src: logoAmazonStudios,
            className: 'w-[152px] xl:w-[220px]',
        },
        {
            name: 'Framework',
            src: logoFramework,
            className: 'w-[183px] xl:w-[247px]',
        },
    ],
} as const

export const whatZebulIs = {
    label: 'What Zebul is',
    title: 'One record for the whole property.',
    description:
        'Most Nigerian landlords and agencies still run on spreadsheets, paper receipts and a busy WhatsApp group. Zebul puts all of it in one place: every property, tenancy, payment and document, reachable on any phone, even on a slow connection.',
    points: [
        {
            title: 'One record, every role',
            description:
                'Owners, agents, tenants, estate committees and finance partners each work in their own portal against the same underlying data, with strict access boundaries between them.',
        },
        {
            title: 'Money moves to the right account',
            description:
                'Rent is processed through licensed payment providers. Agency funds and client funds stay separated at the database layer. Communal estate funds never mix with private finances.',
        },
        {
            title: 'A facilitator, never a lender',
            description:
                'For rent financing, Zebul presents partner loan products and routes applications. The financial institution makes every credit decision and disburses funds directly to the landlord.',
        },
    ],
} as const

export const whoItServes = {
    label: 'Who it serves',
    title: 'Five ways to manage property, one platform.',
    description:
        'Zebul supports the full range of property arrangements found in Nigeria, from a single landlord to an agency running hundreds of units, the community-governed estate, and government or institutional bodies that house people at scale.',
    segments: [
        {
            id: 'owners',
            tab: 'Property Owners',
            title: 'Self-managed landlords',
            description:
                'Manage your own portfolio directly, from a single flat to a block of units, without an agent in the middle.',
            points: [
                'Register properties, units and lease terms',
                'Collect rent and issue receipts automatically',
                'Approve maintenance and track every expense',
                'Free forever for owners on the starter tier',
            ],
            image: servesOwners,
            imageAlt:
                'Zebul tenants screen showing active tenants, arrears and pending applications',
        },
        {
            id: 'agencies',
            tab: 'Agencies',
            title: 'Property management agencies',
            description:
                'Run multiple client portfolios with staff hierarchies, commission tracking and client invoicing in one place.',
            points: [
                'Multi-client portfolios with no cross-client visibility',
                'Commission ledgers and client disbursement records',
                'Assign agents to properties and balance workload',
                'Agency funds kept fully separate from client funds',
            ],
            image: servesAgencies,
            imageAlt: 'Zebul units screen for an agency portfolio',
        },
        {
            id: 'estates',
            tab: 'Estates · Flagship',
            title: 'Community-governed estates',
            description:
                'Elected Estate Management Committees bill communal dues, track vendors and run governance on an append-only ledger.',
            points: [
                'Multi-fund levy billing and automated invoicing',
                'Immutable communal ledger residents can audit',
                'Dues clearance certificates and arrears escalation',
                'Unit owners keep private finances fully isolated',
            ],
            image: servesEstates,
            imageAlt:
                'Zebul properties screen showing total properties and units',
        },
        {
            id: 'hybrid',
            tab: 'Hybrid Operators',
            title: 'Owner and manager in one',
            description:
                'For people who own property personally and also manage property for others, with the two roles kept apart at all times.',
            points: [
                'Switch context between your own and managed property',
                'Complete financial separation between the two roles',
                'Clear on-screen indicators of the active context',
                'Cross-context reporting for the full picture',
            ],
            image: servesHybrid,
            imageAlt:
                'Zebul lease screen listing agreements from draft to ended',
        },
        {
            id: 'institutional',
            tab: 'Government & Institutional',
            title: 'Bulk and institutional housing',
            description:
                'For bodies that allocate housing rather than let it: government and military quarters, university and hospital accommodation, corporate and embassy staff housing, and traditional markets. Run on a fixed annual licence.',
            points: [
                'Allocation and reallocation workflows',
                'Student hostels with session billing',
                'Guardian access for student dependants',
                'Market stall allocation and rotation',
                'Compliance and audit-ready reporting',
            ],
            image: servesInstitutional,
            imageAlt: 'Zebul properties screen for institutional housing',
        },
    ],
} as const

type ExploreCard = { title: string; description: string; link: NavLink }

const exploreCards: ExploreCard[] = [
    {
        title: 'The platform',
        description:
            'Rent, leases, maintenance, documents, reporting, and the marketplace and apps around them.',
        link: { label: 'See capabilities', to: '/platform' },
    },
    {
        title: 'See it in action',
        description:
            'A visual tour of the dashboards, the tenant app and the estate ledger.',
        link: { label: 'Take the tour', to: '/tour' },
    },
    {
        title: 'Rent financing',
        description:
            "How tenants spread yearly rent while landlords are paid in full, and where Zebul's role ends.",
        link: { label: 'How financing works', to: '/financing' },
    },
    {
        title: 'Estate',
        description:
            'The Community-Governed Estate Module for elected committees and unit owners.',
        link: { label: 'For estates', to: '/estates' },
    },
    {
        title: 'Institutions',
        description:
            'Government, university, hospital, corporate and market housing on a fixed annual licence.',
        link: { label: 'For institutions', to: '/institutions' },
    },
    {
        title: 'Pricing',
        description:
            'Free to start for owners, with paid tiers as a portfolio grows.',
        link: { label: 'See pricing', to: '/pricing' },
    },
    {
        title: 'Questions',
        description:
            'Common questions from owners, tenants, agencies and estates.',
        link: { label: 'Read the FAQ', to: '/faq' },
    },
]

export const explore = {
    label: 'Find your way around',
    title: 'More on how Zebul works.',
    description:
        'Each part of the platform has its own page. Start wherever fits your role.',
    // Soft-launch: cards for preview-only pages drop out until those pages ship.
    cards: exploreCards.filter((card) => !isPreviewOnlyPath(card.link.to)),
}

export const cta = {
    label: 'Get started with Zebul',
    title: 'Put your properties, tenants and rent on one platform.',
    description:
        'Book a demo to see Zebul against your own portfolio, or start free as an owner today. Partner enquiries from financial institutions and estate associations are welcome.',
    actions: {
        primary: { label: 'Book a Demo', to: '/demo' },
        secondary: { label: 'Become a Partner', to: '/partners' },
    },
} as const satisfies {
    label: string
    title: string
    description: string
    actions: { primary: NavLink; secondary: NavLink }
}
