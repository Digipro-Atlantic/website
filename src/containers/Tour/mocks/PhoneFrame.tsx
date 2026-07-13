import type { ReactNode } from 'react'

type PhoneFrameProps = {
    children: ReactNode
}

export const PhoneFrame = ({ children }: PhoneFrameProps) => (
    <div className="mx-auto w-[248px] rounded-[34px] bg-[#0f2c23] p-[11px] shadow-[0_30px_70px_-34px_rgba(15,70,54,0.55)]">
        <div className="min-h-[430px] overflow-hidden rounded-[24px] bg-[#fbfdfc]">
            {children}
        </div>
    </div>
)
