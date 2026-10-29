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
        { label: 'Product Tour', to: '/tour' },
        // Soft-launch: hidden until product is ready
        { label: 'Rent Financing', to: '/financing', hide: true },
        { label: 'Estate Module', to: '/estates', hide: true },
        { label: 'Institutional Housing', to: '/institutions' },
        { label: 'Marketplace & API', to: '/platform' },
        { label: 'Trust and Compliance', to: '/security', hide: true },
        { label: 'Pricing', to: '/pricing', hide: true },
    ],
    company: [
        { label: 'About Zebul', to: '/' },
        { label: 'FAQ', to: '/faq' },
        { label: 'Book a Demo', to: '/demo' },
        // Soft-launch: partners redirect to the enquiry form
        { label: 'Partnerships', to: '/partners' },
        { label: 'Contact', to: 'mailto:info@zebul.ng', external: true },
        {
            label: 'Report a security issue',
            to: 'mailto:info@zebul.ng',
            external: true,
        },
    ],
    legal: [
        {
            label: 'Terms of Service',
            to: 'https://zebul.ng/terms',
            external: true,
        },
        {
            label: 'Privacy Policy',
            to: 'https://zebul.ng/privacy',
            external: true,
        },
        { label: 'Fees', to: 'https://zebul.ng/fees', external: true },
        {
            label: 'Payments',
            to: 'https://zebul.ng/payments',
            external: true,
        },
        {
            label: 'Subscriptions',
            to: 'https://zebul.ng/subscriptions',
            external: true,
        },
    ],
} as const satisfies Record<string, NavLink[]>
