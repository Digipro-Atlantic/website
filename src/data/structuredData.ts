import { pricingTiers, type PricingTier } from './pricing'
import { pageSeo, type SeoPath } from './seo'
import { site } from './site'

/*
 * Machine-readable facts for search and answer engines (Google, ChatGPT
 * search, Perplexity): schema.org JSON-LD per page, and the /llms.txt
 * summary. Both are written into the static build by scripts/prerender.mjs
 * and generated from the same data the pages use, so they cannot drift.
 */

const organisation = {
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/favicon.png`,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
        '@type': 'PostalAddress',
        streetAddress: '6 Asabi Cole Street, Alausa Central Business District',
        addressLocality: 'Ikeja',
        addressRegion: 'Lagos',
        addressCountry: 'NG',
    },
}

/** One plan as a schema.org Offer; paid plans are billed monthly in Naira, before VAT. */
const offer = (tier: PricingTier) => ({
    '@type': 'Offer',
    name: tier.name,
    description: `${tier.description} ${tier.limit}.`,
    price: tier.monthly,
    priceCurrency: 'NGN',
    url: `${site.url}/pricing`,
    ...(tier.monthly > 0 && {
        priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: tier.monthly,
            priceCurrency: 'NGN',
            unitText: 'MONTH',
            billingDuration: 'P1M',
            valueAddedTaxIncluded: false,
        },
    }),
})

const software = {
    '@type': 'SoftwareApplication',
    '@id': `${site.url}/#software`,
    name: site.name,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Property management software',
    operatingSystem: 'Web browser',
    description: site.description,
    url: site.url,
    areaServed: { '@type': 'Country', name: 'Nigeria' },
    provider: { '@id': `${site.url}/#organization` },
    offers: pricingTiers.map(offer),
}

/** JSON-LD for a page: who Zebul is everywhere it matters, and the plans on Pricing. */
export const pageJsonLd = (path: SeoPath) => {
    if (path === '/')
        return {
            '@context': 'https://schema.org',
            '@graph': [
                organisation,
                {
                    '@type': 'WebSite',
                    '@id': `${site.url}/#website`,
                    name: site.name,
                    url: site.url,
                    inLanguage: 'en-NG',
                    publisher: { '@id': `${site.url}/#organization` },
                },
                software,
            ],
        }
    if (path === '/pricing')
        return {
            '@context': 'https://schema.org',
            '@graph': [organisation, software],
        }
    return null
}

const pageList = (paths: SeoPath[]) =>
    paths
        .map(
            (path) =>
                `- [${pageSeo[path].title}](${site.url}${path}): ${pageSeo[path].description}`,
        )
        .join('\n')

const plans = pricingTiers
    .map(
        (tier) =>
            `- ${tier.name}: ${tier.monthly ? `₦${tier.monthly.toLocaleString('en-US')} a month (yearly billing is ten times the monthly price)` : 'free forever'}. ${tier.description} ${tier.limit}.`,
    )
    .join('\n')

/** /llms.txt: a plain summary and map of the site for AI tools (llmstxt.org). */
export const llmsTxt = () => `# ${site.name}

> ${site.name} is ${site.tagline.charAt(0).toLowerCase()}${site.tagline.slice(1)}. ${site.description} It is run by ${site.legalName} (${site.rcNumber}) in Lagos.

${site.name} serves property owners, property management agencies, tenants, estate committees, institutional and government landlords, and financial institutions. Prices are in Naira and exclude VAT, which applies to ${site.name} fees only. Tenants are never charged a subscription.

## Plans

${plans}

## Product

${pageList(['/platform', '/financing', '/estates', '/institutions', '/pricing'])}

## Help and contact

${pageList(['/faq', '/demo', '/contact', '/partners'])}

Email: ${site.contact.email}. Phone: ${site.contact.phoneDisplay}. Address: ${site.contact.address}.

## Optional

${pageList(['/terms', '/privacy'])}
`
