export const securityHero = {
    label: 'Trust and compliance',
    title: 'Built to Nigerian regulation, from the data model up.',
    description:
        'Compliance is designed into the platform, not added afterwards. Identity, encryption, access control and fund separation are enforced at the database layer.',
} as const

export const securityCards = [
    {
        category: 'Identity',
        title: 'NIBSS verification',
        description:
            'NIN and BVN verified through NIBSS at onboarding for the roles that require it.',
    },
    {
        category: 'Encryption',
        title: 'AES-256 at rest',
        description:
            'Sensitive fields, including raw NIN and BVN, are encrypted and inaccessible at the application layer.',
    },
    {
        category: 'Access',
        title: 'Row-level isolation',
        description:
            'Every account sees only its own data. Cross-organisation visibility is blocked by policy, not convention.',
    },
    {
        category: 'Data law',
        title: 'NDPR aligned',
        description:
            'Consent records, retention schedules and data-subject requests handled under the Nigeria Data Protection Regulation.',
    },
    {
        category: 'Lending',
        title: 'CBN framework',
        description:
            'Financing partners hold valid CBN licences under BOFIA 2020 and the Consumer Protection Regulations.',
    },
    {
        category: 'Access control',
        title: 'Mandatory MFA',
        description:
            'Multi-factor authentication is required on every account and must stay active at all times.',
    },
    {
        category: 'Funds',
        title: 'Separated ledgers',
        description:
            'Agency and client funds, and communal and private estate funds, are kept apart by design.',
    },
    {
        category: 'Network',
        title: 'Optimised for the network',
        description:
            'Pages are kept light and the platform runs as a progressive web app with offline reading, so it stays usable on slow or unstable connections.',
    },
] as const
