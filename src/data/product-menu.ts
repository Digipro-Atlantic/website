import type { ProductMenuLink } from './types'

export const productMenuLinks = [
    {
        id: 'platform',
        label: 'Platform',
        description: 'Property operations',
        to: '/platform',
        icon: 'property-management',
    },
    {
        id: 'tour',
        label: 'Tour',
        description: 'See it live',
        to: '/tour',
        icon: 'tour',
    },
] as const satisfies readonly ProductMenuLink[]

export type ProductMenuLinkId = (typeof productMenuLinks)[number]['id']
