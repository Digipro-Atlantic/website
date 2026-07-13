import {
    AppSidebar,
    BrowserFrame,
    UiCard,
    UiChart,
    UiHeader,
    UiLabel,
    UiMain,
    UiStat,
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
    { height: '46%' },
    { height: '58%' },
    { height: '51%' },
    { height: '72%' },
    { height: '64%' },
    { height: '84%', gold: true },
] as const

export const DashboardScreen = () => (
    <BrowserFrame url="app.zebul.ng/dashboard">
        <AppSidebar links={ownerNav} active="Dashboard" />
        <UiMain>
            <UiHeader title="Good morning, Ada" pill="Owner" />
            <div className="mb-3.5 grid grid-cols-4 gap-2">
                <UiStat label="Units" value="24" />
                <UiStat label="Occupancy" value="92%" />
                <UiStat label="Collected" value="₦3.1m" />
                <UiStat label="Open jobs" value="3" />
            </div>
            <UiCard>
                <UiLabel>Rent collected, last 6 months</UiLabel>
                <UiChart bars={chartBars} />
            </UiCard>
        </UiMain>
    </BrowserFrame>
)
