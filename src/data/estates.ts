import type { EstateFeature } from './types'

export const estatesSection = {
    eyebrow: 'Community-Governed Estate Module',
    title: 'Governance infrastructure for gated and planned estates.',
    description:
        'Thousands of Nigerian estates are run by volunteer Estate Management Committees billing dues by hand and tracking funds in personal notebooks. Zebul gives them a proper ledger, automated billing and a record every resident can trust.',
} as const

export const estatesZeroBanner = {
    bold: 'Zero direct cost',
    text: 'to the committee or unit owners. Zebul earns only from transaction activity, not committee fees.',
} as const

export const estateFeatures: readonly EstateFeature[] = [
    {
        id: 'multi-fund',
        title: 'Multi-fund dues billing',
        description:
            'Operational dues, capital projects and ad-hoc levies tracked as separate funds, each with its own register.',
    },
    {
        id: 'ledger',
        title: 'Immutable communal ledger',
        description:
            'An append-only record of every credit and debit, protected against edits so accounts stay verifiable at the AGM.',
    },
    {
        id: 'arrears',
        title: 'Arrears and clearance',
        description:
            'Three-tier arrears escalation, bulk reminders, and dues clearance certificates for units paid in full.',
    },
    {
        id: 'utilities',
        title: 'Generator and utilities',
        description:
            'Fuel logs, service intervals and monthly cost apportionment posted automatically to the communal ledger.',
    },
    {
        id: 'vendor',
        title: 'Vendor and compliance',
        description:
            'Vendor SLA monitoring, area compliance inspections with photo evidence, and formal timestamped notices.',
    },
    {
        id: 'outreach',
        title: 'Owner outreach',
        description:
            'Invite absentee landlords by SMS, WhatsApp or email and merge their record on self-registration.',
    },
]
