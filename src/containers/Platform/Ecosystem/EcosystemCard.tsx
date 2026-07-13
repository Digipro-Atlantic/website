import type { PlatformEcosystemCard } from '@/data/types'
import { EcosystemIcon } from './EcosystemIcon'

type EcosystemCardProps = {
    card: PlatformEcosystemCard
}

export const EcosystemCard = ({ card }: EcosystemCardProps) => (
    <article className="rounded-[14px] border border-line bg-paper p-7 transition duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_18px_40px_-26px_rgba(15,70,54,0.4)]">
        <div className="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-[9px] bg-teal-100">
            <EcosystemIcon icon={card.icon} />
        </div>
        <h4 className="mb-1.5 font-body text-base font-semibold">
            {card.title}
        </h4>
        <p className="text-[15px] text-ink-soft">{card.description}</p>
    </article>
)
