export type NavLink = {
    label: string
    to: string
    external?: boolean
    hash?: string
    hide?: boolean
}

export type TourScreenId =
    | 'dashboard'
    | 'payments'
    | 'tenant-portal'
    | 'estate-ledger'
    | 'financing'
    | 'reporting'

export type TourMockType = 'browser' | 'phone'

export type TourStep = {
    id: TourScreenId
    stepLabel: string
    title: string
    description: string
    bullets: readonly string[]
    mockType: TourMockType
    url?: string
    flip?: boolean
    screen: TourScreenId
}
