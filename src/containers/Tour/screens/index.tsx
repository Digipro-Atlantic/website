import type { ComponentType } from 'react'
import type { TourScreenId } from '@/data/types'
import { DashboardScreen } from './DashboardScreen'
import { EstateLedgerScreen } from './EstateLedgerScreen'
import { FinancingScreen } from './FinancingScreen'
import { PaymentsScreen } from './PaymentsScreen'
import { ReportingScreen } from './ReportingScreen'
import { TenantPortalScreen } from './TenantPortalScreen'

const screens: Record<TourScreenId, ComponentType> = {
    dashboard: DashboardScreen,
    payments: PaymentsScreen,
    'tenant-portal': TenantPortalScreen,
    'estate-ledger': EstateLedgerScreen,
    financing: FinancingScreen,
    reporting: ReportingScreen,
}

export const TourScreen = ({ id }: { id: TourScreenId }) => {
    const Screen = screens[id]
    return <Screen />
}

export * from './DashboardScreen'
export * from './PaymentsScreen'
export * from './TenantPortalScreen'
export * from './EstateLedgerScreen'
export * from './FinancingScreen'
export * from './ReportingScreen'
