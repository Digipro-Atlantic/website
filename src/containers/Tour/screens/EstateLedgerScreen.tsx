import {
    AppSidebar,
    BrowserFrame,
    UiCard,
    UiHeader,
    UiMain,
    UiRow,
    UiStat,
    UiTag,
} from '../mocks'

const estateNav = [
    'Dashboard',
    'Funds',
    'Ledger',
    'Dues',
    'Vendors',
    'Notices',
] as const

export const EstateLedgerScreen = () => (
    <BrowserFrame url="app.zebul.ng/estate/ledger">
        <AppSidebar links={estateNav} active="Ledger" />
        <UiMain>
            <UiHeader title="Communal ledger" pill="Append-only" />
            <div className="mb-3.5 grid grid-cols-3 gap-2">
                <UiStat
                    label="Security"
                    value="₦1.8m"
                    valueClassName="text-[15px]"
                />
                <UiStat
                    label="Generator"
                    value="₦640k"
                    valueClassName="text-[15px]"
                />
                <UiStat
                    label="Maintenance"
                    value="₦920k"
                    valueClassName="text-[15px]"
                />
            </div>
            <UiCard>
                <UiRow
                    left={
                        <>
                            01 Mar ·{' '}
                            <span className="text-ink-soft">
                                Dues, 18 units
                            </span>
                        </>
                    }
                    right="+ ₦540,000"
                />
                <UiRow
                    left={
                        <>
                            04 Mar ·{' '}
                            <span className="text-ink-soft">Diesel, 200L</span>
                        </>
                    }
                    right={<span className="text-ink-soft">- ₦220,000</span>}
                />
                <UiRow
                    left={
                        <>
                            09 Mar ·{' '}
                            <span className="text-ink-soft">Gate repair</span>
                        </>
                    }
                    right={<span className="text-ink-soft">- ₦85,000</span>}
                />
                <UiRow
                    left="Unit 12 dues"
                    right={<UiTag variant="paid">Cleared</UiTag>}
                />
            </UiCard>
        </UiMain>
    </BrowserFrame>
)
