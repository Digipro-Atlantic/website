import {
    AppSidebar,
    BrowserFrame,
    UiCard,
    UiHeader,
    UiMain,
    UiRow,
    UiTag,
} from '../mocks'

const ownerNav = [
    'Dashboard',
    'Properties',
    'Tenants',
    'Payments',
    'Maintenance',
    'Reports',
] as const

const payments = [
    {
        unit: 'Unit 4B',
        tenant: 'Tunde A.',
        amount: '₦450,000',
        status: 'paid' as const,
    },
    {
        unit: 'Unit 2A',
        tenant: 'Grace O.',
        amount: '₦380,000',
        status: 'paid' as const,
    },
    {
        unit: 'Unit 7C',
        tenant: 'Musa I.',
        amount: '₦520,000',
        status: 'due' as const,
    },
    {
        unit: 'Unit 1A',
        tenant: 'Chika E.',
        amount: '₦300,000',
        status: 'paid' as const,
    },
]

export const PaymentsScreen = () => (
    <BrowserFrame url="app.zebul.ng/payments">
        <AppSidebar links={ownerNav} active="Payments" />
        <UiMain>
            <UiHeader title="Payments" pill="March" />
            <UiCard>
                {payments.map((payment) => (
                    <UiRow
                        key={payment.unit}
                        left={
                            <>
                                {payment.unit} ·{' '}
                                <span className="text-ink-soft">
                                    {payment.tenant}
                                </span>
                            </>
                        }
                        right={
                            <>
                                {payment.amount}{' '}
                                <UiTag variant={payment.status}>
                                    {payment.status === 'paid' ? 'Paid' : 'Due'}
                                </UiTag>
                            </>
                        }
                    />
                ))}
            </UiCard>
        </UiMain>
    </BrowserFrame>
)
