import type { PlatformCapability, PlatformEcosystemCard } from './types'

export const capabilitiesSection = {
    eyebrow: 'The platform',
    title: 'The everyday work of a property, in one place.',
    description:
        'Everything writes to the same record. Pay rent and the ledger updates. Raise a repair and it sits against the unit. Renew a lease and the new dates carry through. No double entry, and no end-of-month reconciliation by hand.',
} as const

export const capabilities: readonly PlatformCapability[] = [
    {
        id: 'rent-collection',
        title: 'Rent collection',
        description:
            'Process rent through Paystack, Flutterwave, Remita and Monnify. Receipts and payment history are generated for every transaction.',
        icon: 'rent-collection',
    },
    {
        id: 'lease-management',
        title: 'Lease management',
        description:
            'Create leases from templates, capture digital signatures with OTP verification, and handle renewals with side-by-side term comparison.',
        icon: 'lease-management',
    },
    {
        id: 'maintenance',
        title: 'Maintenance tracking',
        description:
            'Tenants raise requests, owners approve, work orders run to completion. Every job and its cost is recorded against the unit.',
        icon: 'maintenance',
    },
    {
        id: 'document-vault',
        title: 'Document vault',
        description:
            'Leases, receipts and inspection reports stored with version control, retention policies and access controls aligned to NDPR.',
        icon: 'document-vault',
    },
    {
        id: 'financial-reporting',
        title: 'Financial reporting',
        description:
            'Income against expenditure, occupancy-based analysis, owner disbursement tracking and period comparison, exportable on demand.',
        icon: 'financial-reporting',
    },
    {
        id: 'communications',
        title: 'Communications',
        description:
            'Reach tenants and residents on WhatsApp and SMS, both treated as primary channels, with in-app messages and bulk announcements when you need them.',
        icon: 'communications',
    },
]

export const ecosystemSection = {
    eyebrow: 'Ecosystem and reach',
    title: 'Connected to the people and tools around a property.',
    description:
        'Beyond the people who manage a property day to day, Zebul links to the contractors who service it, the partners who list it, and the devices everyone actually uses.',
    // Soft-launch (previous): '... partners who list and fund it...'
} as const

export const ecosystemCards: readonly PlatformEcosystemCard[] = [
    {
        id: 'marketplace',
        title: 'Service provider marketplace',
        description:
            'Vetted maintenance contractors and service providers receive work orders, deliver against them and invoice through Zebul, with ratings kept on record.',
        icon: 'marketplace',
    },
    {
        id: 'integrations',
        title: 'Partner integrations',
        description:
            "Property listing platforms, data partners and accounting tools connect through Zebul's API, published at zebul.ng/integrations.",
        // Soft-launch (previous):
        // "Financial institutions, property listing platforms, data partners..."
        icon: 'integrations',
    },
    {
        id: 'mobile',
        title: 'Mobile and offline',
        description:
            'Apps for iOS and Android, a progressive web app with offline reading, and WhatsApp and SMS for everyone else.',
        // Soft-launch (previous):
        // '... offline reading for estate committees, and WhatsApp and SMS...'
        icon: 'mobile',
    },
]
