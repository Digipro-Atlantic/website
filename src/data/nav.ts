import type { NavLink } from './types'

export const navCtas = {
    signIn: { label: 'Sign In', to: '/signin' },
    bookDemo: { label: 'Book a Demo', to: '/demo' },
} as const

/** Header links. Set `hide: true` to omit from the header and mobile menu. */
export const headerNav = [
    { label: 'Platform', to: '/platform' },
    { label: 'Rent Financing', to: '/financing' },
    { label: 'Estates', to: '/estates' },
    { label: 'Institutions', to: '/institutions' },
    { label: 'Pricing', to: '/pricing' },
] as const satisfies readonly NavLink[]

export const footerNav = {
    platform: [
        { label: 'Capabilities', to: '/platform' },
        { label: 'Rent Financing', to: '/financing' },
        { label: 'Estate Module', to: '/estates' },
        { label: 'Institutional Housing', to: '/institutions' },
        { label: 'Pricing', to: '/pricing' },
    ],
    company: [
        { label: 'About Zebul', to: '/' },
        { label: 'FAQ', to: '/faq' },
        { label: 'Book a Demo', to: '/demo' },
        { label: 'Partnerships', to: '/partners' },
        { label: 'Contact', to: '/contact' },
        {
            label: 'Report a security issue',
            to: 'mailto:info@zebul.ng',
            external: true,
        },
    ],
    legal: [
        { label: 'Terms of Service', to: '/terms' },
        { label: 'Privacy Policy', to: '/privacy' },
        // The Additional Fees table on the Pricing page.
        { label: 'Fees', to: '/pricing', hash: 'fees' },
    ],
} as const satisfies Record<string, NavLink[]>
