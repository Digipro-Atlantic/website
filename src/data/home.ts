import type { NavLink, StatementPoint, ModelCard } from './types'

export const hero = {
    eyebrow: 'Property management, built for Nigeria, built for you',
    headline: 'Run every property, estate and rent payment from',
    headlineEmphasis: 'one platform.',
    lead: 'Rent, leases, maintenance, estate dues and tenant rent financing, on one platform. It works the same whether you own a single flat, run an agency with hundreds of units, sit on an estate committee, or manage a plaza, a market, a student hostel or a block of government quarters. And it is optimised to run on an ordinary phone, even where the network is slow.',
    ctas: {
        primary: {
            label: 'Get started',
            to: '/signin',
            hash: 'create',
        },
        secondary: {
            label: 'See the platform',
            to: '/tour',
        },
    },
} as const satisfies {
    eyebrow: string
    headline: string
    headlineEmphasis: string
    lead: string
    ctas: {
        primary: NavLink & { hash?: string }
        secondary: NavLink
    }
}

export const trustChips = [
    'NDPR aligned',
    'CBN and BOFIA 2020 framework',
    'NIBSS NIN and BVN verification',
    'Row-level data isolation',
    'Mandatory MFA',
] as const

export const statement = {
    eyebrow: 'What Zebul is',
    headline: 'One record for the whole property.',
    description:
        'Most Nigerian landlords, agencies and estates still run on spreadsheets, paper receipts and a busy WhatsApp group. Zebul puts all of it in one place: every property, tenancy, payment and document, reachable on any phone, even on a slow connection.',
    points: [
        {
            number: '01',
            title: 'One record, every role',
            description:
                'Owners, agents, tenants, estate committees and finance partners each work in their own portal against the same underlying data, with strict access boundaries between them.',
        },
        {
            number: '02',
            title: 'Money moves to the right account',
            description:
                'Rent is processed through licensed payment providers. Agency funds and client funds stay separated at the database layer. Communal estate funds never mix with private finances.',
        },
        {
            number: '03',
            title: 'A facilitator, never a lender',
            description:
                'For rent financing, Zebul presents partner loan products and routes applications. The financial institution makes every credit decision and disburses funds directly to the landlord.',
        },
    ] as const satisfies readonly StatementPoint[],
}

export const models = {
    eyebrow: 'Who it serves',
    headline: 'Five ways to manage property, one platform.',
    description:
        'Zebul supports the full range of property arrangements found in Nigeria, from a single landlord to an agency running hundreds of units, the community-governed estate, and government or institutional bodies that house people at scale.',
    cards: [
        {
            tag: 'Property owners',
            title: 'Self-managed landlords',
            description:
                'Manage your own portfolio directly, from a single flat to a block of units, without an agent in the middle.',
            features: [
                'Register properties, units and lease terms',
                'Collect rent and issue receipts automatically',
                'Approve maintenance and track every expense',
                'Free forever for owners on the starter tier',
            ],
        },
        {
            tag: 'Agencies',
            title: 'Property management agencies',
            description:
                'Run multiple client portfolios with staff hierarchies, commission tracking and client invoicing in one place.',
            features: [
                'Multi-client portfolios with no cross-client visibility',
                'Commission ledgers and client disbursement records',
                'Assign agents to properties and balance workload',
                'Agency funds kept fully separate from client funds',
            ],
        },
        {
            tag: 'Estates · flagship',
            title: 'Community-governed estates',
            description:
                'Elected Estate Management Committees bill communal dues, track vendors and run governance on an append-only ledger.',
            features: [
                'Multi-fund levy billing and automated invoicing',
                'Immutable communal ledger residents can audit',
                'Dues clearance certificates and arrears escalation',
                'Unit owners keep private finances fully isolated',
            ],
        },
        {
            tag: 'Hybrid operators',
            title: 'Owner and manager in one',
            description:
                'For people who own property personally and also manage property for others, with the two roles kept apart at all times.',
            features: [
                'Switch context between your own and managed property',
                'Complete financial separation between the two roles',
                'Clear on-screen indicators of the active context',
                'Cross-context reporting for the full picture',
            ],
        },
        {
            tag: 'Government and institutional',
            title: 'Bulk and institutional housing',
            description:
                'For bodies that allocate housing rather than let it: government and military quarters, university and hospital accommodation, corporate and embassy staff housing, and traditional markets. Run on a fixed annual licence.',
            features: [
                'Allocation and reallocation workflows',
                'Student hostels with session billing',
                'Guardian access for student dependants',
                'Market stall allocation and rotation',
                'Compliance and audit-ready reporting',
            ],
            wide: true,
        },
    ] as const satisfies readonly ModelCard[],
    tenantNote:
        'Tenants get their own portal at no cost: pay rent, sign leases digitally, track maintenance and carry a portable tenancy record between homes.',
    propertyTypes: [
        'Residential blocks',
        'Duplexes and bungalows',
        'Self-contained units',
        'Offices and retail',
        'Mixed-use developments',
        'Market stalls and plazas',
        'Student hostels',
        'Government and military quarters',
        'Institutional quarters',
    ] as const,
}

export const ecoSection = {
    eyebrow: 'Find your way around',
    title: 'More on how Zebul works.',
    description:
        'Each part of the platform has its own page. Start wherever fits your role.',
} as const

export const cta = {
    eyebrow: 'Get started with Zebul',
    headline: 'Put your properties, tenants and rent on one platform.',
    description:
        'Book a demo to see Zebul against your own portfolio, or start free as an owner today. Partner enquiries from financial institutions and estate associations are welcome.',
    actions: {
        primary: { label: 'Book a demo', to: '/demo' },
        secondary: { label: 'Become a partner', to: '/partners' },
    },
} as const satisfies {
    eyebrow: string
    headline: string
    description: string
    actions: {
        primary: NavLink
        secondary: NavLink
    }
}
