import type { ModelCard as ModelCardData } from '@/data/types'
import { RoofIcon } from './RoofIcon'

type ModelCardProps = {
    card: ModelCardData
}

const featureClass = (wide: boolean) =>
    wide
        ? 'marked-li marked-li--light text-white/84'
        : 'marked-li text-ink-soft'

export const ModelCard = ({ card }: ModelCardProps) => {
    const wide = card.wide ?? false

    if (wide) {
        return (
            <article className="model-card model-card--wide col-span-full">
                <RoofIcon className="model-card__roof" />
                <div className="grid items-center gap-8 min-[981px]:grid-cols-[1.05fr_1fr]">
                    <div>
                        <span className="model-card__tag text-gold-soft">
                            {card.tag}
                        </span>
                        <h3 className="mt-3.5 mb-2.5 text-[22px] text-white">
                            {card.title}
                        </h3>
                        <p className="text-[15px] text-white/86">
                            {card.description}
                        </p>
                    </div>
                    <ul className="grid gap-2">
                        {card.features.map((feature) => (
                            <li key={feature} className={featureClass(true)}>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
        )
    }

    return (
        <article className="model-card">
            <RoofIcon className="model-card__roof" />
            <span className="model-card__tag">{card.tag}</span>
            <h3 className="mt-3.5 mb-2.5 text-[22px]">{card.title}</h3>
            <p className="text-[15px] text-ink-soft">{card.description}</p>
            <ul className="mt-4 grid gap-2">
                {card.features.map((feature) => (
                    <li key={feature} className={featureClass(false)}>
                        {feature}
                    </li>
                ))}
            </ul>
        </article>
    )
}
