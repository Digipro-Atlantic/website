import type { NavLink } from './types'

export const notFound = {
    eyebrow: '404',
    headline: 'This page is not on the map.',
    description:
        'The link may be outdated, mistyped, or the page may have moved. Head home, or jump to one of the pages below.',
    primary: { label: 'Back to home', to: '/' } satisfies NavLink,
    secondary: { label: 'See the product tour', to: '/tour' } satisfies NavLink,
    helpfulHeading: 'Helpful links',
    helpfulLinks: [
        { label: 'Platform', to: '/platform' },
        { label: 'Institutions', to: '/institutions' },
        { label: 'FAQ', to: '/faq' },
        { label: 'Product tour', to: '/tour' },
    ] as const satisfies readonly NavLink[],
} as const
