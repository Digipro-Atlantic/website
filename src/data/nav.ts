import type { NavLink } from './types'

export const primaryNav: NavLink[] = [
    { label: 'Home', to: '/' },
    { label: 'Platform', to: '/platform' },
    // Soft-launch: hidden until product is ready
    // { label: 'Rent financing', to: '/financing' },
    // { label: 'Estates', to: '/estates' },
    { label: 'Institutions', to: '/institutions' },
    // { label: 'Pricing', to: '/pricing' },
    { label: 'FAQ', to: '/faq' },
]

export const navCtas = {
    // Soft-launch: hide until app.zebul.ng (or equivalent) is live
    signIn: { label: 'Sign in', to: '/signin', hide: true },
    bookDemo: { label: 'Book a demo', to: '/demo' },
} as const

/** Header links (legacy flat nav minus Home). Set `hide: true` to omit from the header. */
export const headerNav = [
    // Soft-launch: hidden until product is ready
    { label: 'Rent financing', to: '/financing', hide: true },
    { label: 'Estates', to: '/estates', hide: true },
    { label: 'Institutions', to: '/institutions', hide: false },
    { label: 'Pricing', to: '/pricing', hide: true },
    { label: 'FAQ', to: '/faq' },
] as const satisfies readonly NavLink[]

export const footerNav = {
    platform: [
        { label: 'Capabilities', to: '/platform' },
        { label: 'Product tour', to: '/tour' },
        // Soft-launch: hidden until product is ready
        { label: 'Rent financing', to: '/financing', hide: true },
        { label: 'Estate module', to: '/estates', hide: true },
        { label: 'Institutional housing', to: '/institutions' },
        {
            label: 'Marketplace and API',
            to: '/platform',
            external: false,
        },
        { label: 'Trust and compliance', to: '/security', hide: true },
        { label: 'Pricing', to: '/pricing', hide: true },
    ],
    company: [
        { label: 'About Zebul', to: '/' },
        { label: 'FAQ', to: '/faq' },
        { label: 'Book a demo', to: '/demo' },
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
