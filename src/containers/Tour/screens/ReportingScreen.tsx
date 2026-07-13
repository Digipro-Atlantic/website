import {
    AppSidebar,
    BrowserFrame,
    UiCard,
    UiChart,
    UiHeader,
    UiLabel,
    UiMain,
    UiRow,
} from '../mocks'

const ownerNav = [
    'Dashboard',
    'Properties',
    'Tenants',
    'Payments',
    'Maintenance',
    'Reports',
] as const

const chartBars = [
    { height: '70%' },
    { height: '40%', gold: true },
    { height: '78%' },
    { height: '46%', gold: true },
    { height: '66%' },
    { height: '38%', gold: true },
] as const

export const ReportingScreen = () => (
    <BrowserFrame url="app.zebul.ng/reports">
        <AppSidebar links={ownerNav} active="Reports" />
        <UiMain>
            <UiHeader title="Reporting" pill="Export" />
            <UiCard>
                <UiLabel>Income against expenditure</UiLabel>
                <UiChart bars={chartBars} />
            </UiCard>
            <div className="mt-2.5">
                <UiCard>
                    <UiRow
                        left="Occupancy"
                        right={<span className="text-ink-soft">92%</span>}
                    />
                    <UiRow
                        left="Owner disbursements"
                        right={<span className="text-ink-soft">₦2.6m</span>}
                    />
                </UiCard>
            </div>
        </UiMain>
    </BrowserFrame>
)
