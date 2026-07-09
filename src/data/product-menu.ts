import type { ProductMenu } from './types'

export const productMenu = {
    products: [
        {
            id: 'property-management',
            label: 'Property Management',
            description:
                'Rent, leases, maintenance, documents, reporting, and the marketplace and apps around them.',
            to: '/platform',
            icon: 'property-management',
            solutions: [
                {
                    id: 'capabilities',
                    label: 'Capabilities',
                    description:
                        'Everything you need to run property in one place, from onboarding tenants to collecting rent.',
                    to: '/platform',
                },
                {
                    id: 'product-tour',
                    label: 'Product tour',
                    description:
                        'A visual tour of the dashboards, the tenant app and the estate ledger.',
                    to: '/tour',
                },
                {
                    id: 'marketplace-api',
                    label: 'Marketplace and API',
                    description:
                        'Connect integrations and extend Zebul with marketplace apps and developer APIs.',
                    to: '/platform',
                },
                {
                    id: 'trust-compliance',
                    label: 'Trust and compliance',
                    description:
                        'Security, data protection, and compliance built for property operations in Nigeria.',
                    to: '/security',
                },
            ],
        },
        {
            id: 'financing',
            label: 'Rent financing',
            description:
                "How tenants spread yearly rent while landlords are paid in full, and where Zebul's role ends.",
            to: '/financing',
            icon: 'financing',
            solutions: [
                {
                    id: 'how-it-works',
                    label: 'How financing works',
                    description:
                        'Connect tenants who need advance rent with licensed lenders — without Zebul providing credit.',
                    to: '/financing',
                },
                {
                    id: 'tenant-applications',
                    label: 'Tenant applications',
                    description:
                        'Apply through Zebul, get a lender decision, and pay rent in monthly instalments.',
                    to: '/financing',
                },
                {
                    id: 'landlord-payouts',
                    label: 'Landlord payouts',
                    description:
                        'Approved funds go straight to the landlord while the tenant repays the lender separately.',
                    to: '/financing',
                },
            ],
        },
        {
            id: 'estates',
            label: 'Estates',
            description:
                'The Community-Governed Estate Module for elected committees and unit owners.',
            to: '/estates',
            icon: 'estates',
            solutions: [
                {
                    id: 'estate-module',
                    label: 'Estate module',
                    description:
                        'Tools for committees to manage service charges, approvals, and estate-wide operations.',
                    to: '/estates',
                },
                {
                    id: 'committee-tools',
                    label: 'Committee tools',
                    description:
                        'Transparency for elected committees with ledgers, requests, and resident communication.',
                    to: '/estates',
                },
                {
                    id: 'unit-owners',
                    label: 'Unit owners',
                    description:
                        'Individual owners inside gated estates see only what concerns their unit.',
                    to: '/estates',
                },
            ],
        },
        {
            id: 'institutions',
            label: 'Institutions',
            description:
                'Government, university, hospital, corporate and market housing on a fixed annual licence.',
            to: '/institutions',
            icon: 'institutions',
            solutions: [
                {
                    id: 'institutional-housing',
                    label: 'Institutional housing',
                    description:
                        'Hostels and staff housing for universities, hospitals, corporates, and public sector.',
                    to: '/institutions',
                },
                {
                    id: 'academic-billing',
                    label: 'Academic calendar billing',
                    description:
                        'Billing aligned to semesters and sessions instead of only monthly rent cycles.',
                    to: '/institutions',
                },
                {
                    id: 'annual-licence',
                    label: 'Annual licence',
                    description:
                        'Fixed annual pricing for institutions running housing at scale.',
                    to: '/institutions',
                },
            ],
        },
    ],
    footerLinks: [
        {
            id: 'security',
            label: 'Trust and compliance',
            to: '/security',
            icon: 'security',
        },
        {
            id: 'tour',
            label: 'Product tour',
            to: '/tour',
            icon: 'tour',
        },
    ],
} as const satisfies ProductMenu

export type ProductMenuProductId = (typeof productMenu.products)[number]['id']

export const getProductById = (id: ProductMenuProductId) =>
    productMenu.products.find((product) => product.id === id)

export const productNavLinks = productMenu.products.map(({ label, to }) => ({
    label,
    to,
}))
