import type { ReactNode } from 'react'

type BrowserFrameProps = {
    url: string
    children: ReactNode
}

export const BrowserFrame = ({ url, children }: BrowserFrameProps) => (
    <div className="overflow-hidden rounded-[14px] border border-line bg-white shadow-[0_30px_70px_-36px_rgba(15,70,54,0.5)]">
        <div className="flex items-center gap-1.5 border-b border-line bg-teal-100 px-3.5 py-2.5">
            <span className="size-2.5 rounded-full bg-[#e6a6a0]" />
            <span className="size-2.5 rounded-full bg-[#e9cf9a]" />
            <span className="size-2.5 rounded-full bg-[#a9cdbb]" />
            <span className="ml-2 flex-1 rounded-full border border-line bg-white px-3 py-1 font-mono text-[11px] text-ink-soft">
                {url}
            </span>
        </div>
        <div className="flex min-h-[298px] text-xs">{children}</div>
    </div>
)
