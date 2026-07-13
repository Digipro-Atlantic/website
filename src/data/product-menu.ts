import type { ProductMenuLink } from './types'

export const productMenuLinks = [
    {
        id: 'platform',
        label: 'Platform',
        description:
            'Rent, leases, maintenance, documents, reporting, and the marketplace and apps around them.',
        to: '/platform',
        icon: 'property-management',
    },
    {
        id: 'tour',
        label: 'Tour',
        description:
            'A visual tour of the dashboards, the tenant app and the estate ledger.',
        to: '/tour',
        icon: 'tour',
    },
] as const satisfies readonly ProductMenuLink[]

export type ProductMenuLinkId = (typeof productMenuLinks)[number]['id']
