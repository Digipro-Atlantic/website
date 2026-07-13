import type { NavLink } from './types'

export const primaryNav: NavLink[] = [
    { label: 'Home', to: '/' },
    { label: 'Platform', to: '/platform' },
    { label: 'Rent financing', to: '/financing' },
    { label: 'Estates', to: '/estates' },
    { label: 'Institutions', to: '/institutions' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'FAQ', to: '/faq' },
]

export const navCtas = {
    signIn: { label: 'Sign in', to: '/signin' },
    bookDemo: { label: 'Book a demo', to: '/demo' },
} as const

/** Header links (legacy flat nav minus Home). Set `hide: true` to omit from the header. */
export const headerNav = [
    { label: 'Platform', to: '/platform', hide: true },
    { label: 'Rent financing', to: '/financing', hide: false },
    { label: 'Estates', to: '/estates', hide: false },
    { label: 'Institutions', to: '/institutions', hide: false },
    { label: 'Pricing', to: '/pricing' },
    { label: 'FAQ', to: '/faq' },
] as const satisfies readonly NavLink[]

export const footerNav = {
    platform: [
        { label: 'Capabilities', to: '/platform' },
        { label: 'Product tour', to: '/tour' },
        { label: 'Rent financing', to: '/financing' },
        { label: 'Estate module', to: '/estates' },
        { label: 'Institutional housing', to: '/institutions' },
        {
            label: 'Marketplace and API',
            to: '/platform',
            external: false,
        },
        { label: 'Trust and compliance', to: '/security' },
        { label: 'Pricing', to: '/pricing' },
    ],
    company: [
        { label: 'About Zebul', to: '/' },
        { label: 'FAQ', to: '/faq' },
        { label: 'Book a demo', to: '/demo' },
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
