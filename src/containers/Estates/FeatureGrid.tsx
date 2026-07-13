import { Reveal } from '@/components/Reveal'
import { estateFeatures } from '@/data/estates'
import { FeatureCard } from './FeatureCard'

export const FeatureGrid = () => (
    <div className="grid grid-cols-1 gap-3.5 min-[681px]:grid-cols-2">
        {estateFeatures.map((feature) => (
            <Reveal key={feature.id}>
                <FeatureCard feature={feature} />
            </Reveal>
        ))}
    </div>
)
