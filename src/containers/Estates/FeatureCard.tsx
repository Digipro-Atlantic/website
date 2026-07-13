import type { EstateFeature } from '@/data/types'

type FeatureCardProps = {
    feature: EstateFeature
}

export const FeatureCard = ({ feature }: FeatureCardProps) => (
    <article className="rounded-[11px] border border-line bg-paper p-[18px]">
        <h4 className="mb-[5px] font-body text-[14.5px] font-semibold text-teal-800">
            {feature.title}
        </h4>
        <p className="text-[13px] text-ink-soft">{feature.description}</p>
    </article>
)
