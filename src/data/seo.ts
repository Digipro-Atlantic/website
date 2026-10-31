import { site } from './site'

/*
 * Search and link-preview copy for every public page. Titles stay under ~60
 * characters and descriptions under ~155 so Google shows them whole; the
 * description doubles as the WhatsApp / LinkedIn / X preview text.
 */

export type PageSeo = {
    title: string
    description: string
    /** Keep the page out of search results (thin or utility pages). */
    noindex?: boolean
}

/** Shared 1200×630 preview image in /public, used when a page has none of its own. */
export const shareImage = {
    src: '/og/zebul-share.png',
    width: 1200,
    height: 630,
    alt: 'Zebul, the property platform for Nigeria',
} as const

export const pageSeo = {
    '/': {
        title: `${site.name} | ${site.tagline}`,
        description:
            'Run every property, estate and rent payment from one place. Rent collection, leases, maintenance and documents for Nigerian owners, agencies and estates.',
    },
    '/platform': {
        title: 'Platform: rent, leases and maintenance in one place | Zebul',
        description:
            'Rent collection, leases, maintenance, documents and reporting on one record. Pay rent and the ledger updates. No double entry, no reconciling by hand.',
    },
    '/financing': {
        title: 'Tenant rent financing: pay annual rent monthly | Zebul',
        description:
            'Zebul connects tenants to licensed lenders who fund a year of rent up front, so tenants repay monthly while the landlord is still paid in full.',
    },
    '/estates': {
        title: 'Estate management software for Nigerian estates | Zebul',
        description:
            'Dues billing, an append-only communal ledger, arrears, utilities and vendor tracking for gated and planned estates, at zero direct cost to committees.',
    },
    '/institutions': {
        title: 'Institutional and bulk housing management | Zebul',
        description:
            'Allocations, student and staff housing, guardian access and compliance for agencies, universities, hospitals and employers housing people at scale.',
    },
    '/pricing': {
        title: 'Pricing: free for owners, plans for agencies | Zebul',
        description:
            'Start free forever as an owner. Essential, Pro and Enterprise plans add capacity as your portfolio grows, priced in Naira. Tenants never pay a subscription.',
    },
    '/faq': {
        title: 'Frequently asked questions | Zebul',
        description:
            'Answers for owners, agencies, tenants and estates: pricing, rent collection, rent financing, data security and how to get started with Zebul.',
    },
    '/demo': {
        title: 'Book a demo | Zebul',
        description:
            'A short, no-obligation walkthrough of Zebul set up around the property you run and the role you play. Pick a day and time that suits you.',
    },
    '/contact': {
        title: 'Contact us | Zebul',
        description: `Talk to the Zebul team in Lagos. Email ${site.contact.email}, call ${site.contact.phoneDisplay}, or send us a message and we will get back to you.`,
    },
    '/partners': {
        title: 'Partner with Zebul: lenders, estates and integrations',
        description:
            'Lend against rent with pre-assessed applications, bring your estate onto Zebul, join the service marketplace, or integrate with our API.',
    },
    '/terms': {
        title: 'Terms of Service | Zebul',
        description:
            'The terms that govern your use of the Zebul platform, website and applications as an owner, agency, tenant or financial institution.',
    },
    '/privacy': {
        title: 'Privacy Policy | Zebul',
        description:
            'How Zebul collects, uses, shares and protects personal information, and the rights you have over your data.',
    },
} as const satisfies Record<string, PageSeo>

export type SeoPath = keyof typeof pageSeo

/** Absolute URL on the live domain; the home page keeps its trailing slash. */
const absolute = (path: string) => `${site.url}${path}`

/**
 * Head tags for one page: title, description, canonical URL and the Open
 * Graph / X tags that WhatsApp, LinkedIn, Slack and X read for link previews.
 * Site-wide defaults (site name, locale, card type) live on the root route.
 */
export const pageHead = (path: SeoPath) => {
    const page: PageSeo = pageSeo[path]
    const url = absolute(path)
    const image = absolute(shareImage.src)
    return {
        meta: [
            { title: page.title },
            { name: 'description', content: page.description },
            ...(page.noindex ? [{ name: 'robots', content: 'noindex' }] : []),
            { property: 'og:title', content: page.title },
            { property: 'og:description', content: page.description },
            { property: 'og:url', content: url },
            { property: 'og:image', content: image },
            { property: 'og:image:width', content: String(shareImage.width) },
            { property: 'og:image:height', content: String(shareImage.height) },
            { property: 'og:image:alt', content: shareImage.alt },
            { name: 'twitter:title', content: page.title },
            { name: 'twitter:description', content: page.description },
            { name: 'twitter:image', content: image },
        ],
        links: [{ rel: 'canonical', href: url }],
    }
}

/** Defaults every page inherits. */
export const siteHead = {
    meta: [
        { property: 'og:site_name', content: site.name },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_NG' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#005b4c' },
    ],
}
