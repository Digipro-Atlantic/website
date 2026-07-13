import { PhoneFrame, UiLabel, UiRow, UiTag } from '../mocks'

export const TenantPortalScreen = () => (
    <PhoneFrame>
        <div className="bg-teal-900 px-4 pt-4 pb-[18px] text-white">
            <div className="text-[10.5px] text-white/72">Rent due, Flat 4B</div>
            <div className="font-display my-0.5 text-[26px]">₦450,000</div>
            <div className="text-[10.5px] text-white/72">Due 1 April 2026</div>
        </div>
        <div className="px-4 py-3.5 text-xs">
            <div className="my-1.5 mb-3.5 rounded-[9px] bg-gold py-2.5 text-center text-[12.5px] font-bold text-[#1a1205]">
                Pay rent
            </div>
            <UiLabel>Recent receipts</UiLabel>
            <UiRow
                left="March rent"
                right={<UiTag variant="paid">Paid</UiTag>}
            />
            <UiRow
                left="February rent"
                right={<UiTag variant="paid">Paid</UiTag>}
            />
            <div className="mt-3.5">
                <UiLabel>Maintenance</UiLabel>
            </div>
            <UiRow
                left="Leaking tap, kitchen"
                right={<span className="text-ink-soft">In progress</span>}
            />
        </div>
    </PhoneFrame>
)
