type SectionHeaderProps = {
    eyebrow: string
    title: string
    description: string
    eyebrowMuted?: boolean
    className?: string
}

export const SectionHeader = ({
    eyebrow,
    title,
    description,
    eyebrowMuted = false,
    className = '',
}: SectionHeaderProps) => (
    <div className={`mb-14 max-w-[680px] ${className}`.trim()}>
        <span
            className={`inline-block font-mono text-[15px] font-semibold tracking-[0.12em] uppercase ${
                eyebrowMuted ? 'text-teal-400' : 'text-gold'
            }`}
        >
            {eyebrow}
        </span>
        <h2 className="font-display mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.08] font-semibold tracking-tight">
            {title}
        </h2>
        <p className="mt-4 text-[17px] text-ink-soft">{description}</p>
    </div>
)
