import type { ReactNode } from 'react'

export const UiPill = ({ children }: { children: ReactNode }) => (
    <span className="rounded-full bg-teal-100 px-2 py-1 text-[10.5px] font-semibold text-teal-700">
        {children}
    </span>
)

export const UiStat = ({
    label,
    value,
    valueClassName = 'text-lg',
}: {
    label: string
    value: string
    valueClassName?: string
}) => (
    <div className="rounded-[9px] border border-line bg-white p-2.5">
        <div className="text-[9px] tracking-wide text-ink-soft uppercase">
            {label}
        </div>
        <div className={`font-display mt-0.5 text-teal-800 ${valueClassName}`}>
            {value}
        </div>
    </div>
)

type UiChartProps = {
    bars: readonly { height: string; gold?: boolean }[]
}

export const UiChart = ({ bars }: UiChartProps) => (
    <div className="mt-2 flex h-[88px] items-end gap-1.5">
        {bars.map((bar, index) => (
            <span
                key={`${bar.height}-${index}`}
                className={`flex-1 rounded-t opacity-90 ${
                    bar.gold
                        ? 'bg-gradient-to-t from-gold to-gold-soft'
                        : 'bg-gradient-to-t from-teal-700 to-teal-500'
                }`}
                style={{ height: bar.height }}
            />
        ))}
    </div>
)

type UiRowProps = {
    left: ReactNode
    right: ReactNode
}

export const UiRow = ({ left, right }: UiRowProps) => (
    <div className="flex items-center justify-between border-b border-line py-2 text-[11.5px] text-ink last:border-b-0">
        <span>{left}</span>
        <span className="inline-flex items-center gap-1.5">{right}</span>
    </div>
)

export const UiTag = ({
    children,
    variant,
}: {
    children: ReactNode
    variant: 'paid' | 'due'
}) => (
    <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            variant === 'paid'
                ? 'bg-[#e3f1ea] text-[#1c6b54]'
                : 'bg-[#fbecd6] text-[#9a6a16]'
        }`}
    >
        {children}
    </span>
)

export const UiLabel = ({ children }: { children: ReactNode }) => (
    <div className="mb-1.5 text-[10px] tracking-wide text-ink-soft uppercase">
        {children}
    </div>
)

export const UiCard = ({ children }: { children: ReactNode }) => (
    <div className="rounded-[9px] border border-line bg-white p-3">
        {children}
    </div>
)

export const UiMain = ({ children }: { children: ReactNode }) => (
    <div className="min-w-0 flex-1 bg-[#fbfdfc] p-[18px]">{children}</div>
)

export const UiHeader = ({ title, pill }: { title: string; pill: string }) => (
    <div className="mb-3.5 flex items-center justify-between">
        <b className="font-display text-base font-semibold text-ink">{title}</b>
        <UiPill>{pill}</UiPill>
    </div>
)

type GaugeProps = {
    value: number
    max?: number
}

export const Gauge = ({ value, max = 100 }: GaugeProps) => {
    const percent = Math.min(100, Math.round((value / max) * 100))

    return (
        <div className="relative mx-auto size-[120px]">
            <div
                className="size-full rounded-full"
                style={{
                    background: `conic-gradient(var(--color-teal-600) 0 ${percent}%, #e7eeeb ${percent}% 100%)`,
                }}
            />
            <div className="absolute inset-[15px] flex flex-col items-center justify-center rounded-full bg-white">
                <span className="font-display text-[30px] leading-none font-semibold text-teal-800">
                    {value}
                </span>
                <span className="mt-0.5 text-[9.5px] text-ink-soft">
                    of {max}
                </span>
            </div>
        </div>
    )
}
