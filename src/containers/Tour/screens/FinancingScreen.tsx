import { BrowserFrame, Gauge, UiPill, UiRow } from '../mocks'

export const FinancingScreen = () => (
    <BrowserFrame url="app.zebul.ng/financing">
        <div className="flex min-h-[260px] min-w-0 flex-1 items-center gap-5 bg-[#fbfdfc] p-[18px]">
            <div className="shrink-0 text-center">
                <Gauge value={78} />
                <div className="mt-1.5">
                    <UiPill>Advisory</UiPill>
                </div>
            </div>
            <div className="min-w-0 flex-1">
                <div className="mb-3.5">
                    <b className="font-display text-base font-semibold text-ink">
                        Assessment
                    </b>
                </div>
                <UiRow
                    left="Rent paid on time"
                    right={<span className="text-ink-soft">11 of 12</span>}
                />
                <UiRow
                    left="On-platform record"
                    right={<span className="text-ink-soft">Included</span>}
                />
                <UiRow
                    left="Bank statement check"
                    right={<span className="text-ink-soft">With consent</span>}
                />
                <UiRow
                    left="Credit decision"
                    right={
                        <span className="text-ink-soft">The institution</span>
                    }
                />
            </div>
        </div>
    </BrowserFrame>
)
