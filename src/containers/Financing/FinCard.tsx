import type { FinancingCard as FinancingCardData } from '@/data/types'

type FinCardProps = {
    card: FinancingCardData
}

export const FinCard = ({ card }: FinCardProps) => (
    <article className="rounded-[14px] border border-white/12 bg-white/5 p-7">
        <h3 className="mb-3 font-display text-xl font-semibold text-white">
            {card.title}
            {card.titlePill ? (
                <span className="ml-2.5 inline-block rounded-full bg-gold-soft px-2.5 py-1 align-middle font-mono text-[10.5px] font-semibold tracking-[0.1em] text-teal-950 uppercase">
                    {card.titlePill}
                </span>
            ) : null}
        </h3>

        {card.score ? (
            <div className="my-2 mb-3.5 flex items-baseline gap-2.5">
                <b className="font-display text-[40px] font-semibold text-gold-soft">
                    {card.score.value}
                </b>
                <span className="text-[13px] text-white/60">
                    {card.score.label}
                </span>
            </div>
        ) : null}

        {card.paragraphs.map((paragraph) => (
            <p
                key={paragraph.slice(0, 48)}
                className="text-[15px] text-white/80"
            >
                {paragraph}
            </p>
        ))}

        {card.disclaimer ? (
            <p className="mt-4 border-l-2 border-gold pl-3.5 text-[12.5px] text-white/62">
                {card.disclaimer}
            </p>
        ) : null}
    </article>
)
