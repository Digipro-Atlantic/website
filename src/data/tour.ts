import type { TourStep } from './types'

export const tourHero = {
    eyebrow: 'A look inside Zebul',
    title: 'See the platform in action.',
    description:
        'A guided tour of the screens your owners, tenants, agencies and estate committees would use every day.',
    note: 'Interface shown is representative of the Zebul platform.',
    ctas: {
        primary: { label: 'Book a demo', to: '/demo' },
        secondary: { label: 'See all capabilities', to: '/platform' },
    },
} as const

export const tourSteps = [
    {
        id: 'dashboard',
        stepLabel: '01 / Dashboard',
        title: 'Your whole portfolio, in one view.',
        description:
            'Open Zebul and see what matters first: how many units are occupied, what rent has come in this month, and which jobs are still open. No spreadsheets to reconcile by hand.',
        bullets: [
            'Live occupancy and collection figures',
            'Recent payments and pending dues',
            'Works for one flat or hundreds of units',
        ],
        mockType: 'browser',
        url: 'app.zebul.ng/dashboard',
        flip: false,
        screen: 'dashboard',
    },
    {
        id: 'payments',
        stepLabel: '02 / Rent collection',
        title: 'Rent in, receipts out, automatically.',
        description:
            'Tenants pay through Paystack, Flutterwave, Remita or Monnify. Each payment lands against the right unit, a receipt is issued, and you can see at a glance who has paid and who is still due.',
        bullets: [
            'Four payment providers: cards, transfers and USSD',
            'Automatic receipts and full payment history',
            'A clear view of paid and outstanding rent',
        ],
        mockType: 'browser',
        url: 'app.zebul.ng/payments',
        flip: true,
        screen: 'payments',
    },
    {
        id: 'tenant-portal',
        stepLabel: '03 / Tenant portal',
        title: "A tenant's whole tenancy, on their phone.",
        description:
            'Tenants pay rent, keep every receipt, sign their lease and raise repairs from one place, on an ordinary phone, even where the network is slow. Their record stays with them when they move home.',
        bullets: [
            'Pay rent and collect receipts',
            'Raise and follow maintenance requests',
            'Free for every tenant',
        ],
        mockType: 'phone',
        flip: false,
        screen: 'tenant-portal',
    },
    {
        id: 'estate-ledger',
        stepLabel: '04 / Estate module',
        title: 'An estate ledger residents can trust.',
        description:
            "For elected committees: bill dues across separate funds, record every credit and debit on a ledger that cannot be edited, and issue clearance certificates for units paid in full. Communal money never touches anyone's private finances.",
        bullets: [
            'Separate funds for security, generator and projects',
            'An append-only record, ready for the AGM',
            'Zero direct cost to the committee or owners',
        ],
        mockType: 'browser',
        url: 'app.zebul.ng/estate/ledger',
        flip: true,
        screen: 'estate-ledger',
    },
    {
        id: 'financing',
        stepLabel: '05 / Rent financing',
        title: 'An advisory assessment, the lender decides.',
        description:
            'When a tenant applies, Zebul builds an assessment from their rent record and, with consent, third-party checks such as bank statement analysis. It is advisory and indicative only, not a credit rating. The financial institution runs its own credit decision and, on approval, pays the landlord directly.',
        bullets: [
            'Combines on-platform records with third-party data',
            'Advisory and non-binding, the institution decides',
            'Funds go straight to the landlord',
        ],
        mockType: 'browser',
        url: 'app.zebul.ng/financing',
        flip: false,
        screen: 'financing',
    },
    {
        id: 'reporting',
        stepLabel: '06 / Reporting',
        title: 'The numbers, ready to share.',
        description:
            'Income against expenditure, occupancy and owner disbursements, by property or across the whole portfolio. Compare periods and export a clean statement for an owner, a board or an auditor.',
        bullets: [
            'Income, expenditure and occupancy together',
            'Per property or whole portfolio',
            'Export for owners, boards and auditors',
        ],
        mockType: 'browser',
        url: 'app.zebul.ng/reports',
        flip: true,
        screen: 'reporting',
    },
] as const satisfies readonly TourStep[]
