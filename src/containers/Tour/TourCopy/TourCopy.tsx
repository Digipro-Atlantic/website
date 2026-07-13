type TourCopyProps = {
    stepLabel: string
    title: string
    description: string
    bullets: readonly string[]
}

export const TourCopy = ({
    stepLabel,
    title,
    description,
    bullets,
}: TourCopyProps) => (
    <div>
        <span className="font-mono text-[13px] font-semibold tracking-[0.12em] text-gold uppercase">
            {stepLabel}
        </span>
        <h3 className="font-display mt-2.5 mb-3.5 text-[clamp(1.4375rem,2.6vw,2rem)] text-ink">
            {title}
        </h3>
        <p className="text-[15.5px] leading-[1.7] text-ink-soft">
            {description}
        </p>
        <ul className="mt-4 grid gap-2">
            {bullets.map((bullet) => (
                <li
                    key={bullet}
                    className="relative pl-[26px] text-sm text-ink-soft before:absolute before:top-1 before:left-0 before:h-[7px] before:w-[13px] before:-rotate-45 before:border-b-[2.4px] before:border-l-[2.4px] before:border-gold before:content-['']"
                >
                    {bullet}
                </li>
            ))}
        </ul>
    </div>
)
