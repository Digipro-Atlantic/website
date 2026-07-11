import type { NavLink } from './types'

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
