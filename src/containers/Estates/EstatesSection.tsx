import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { estatesSection } from '@/data/estates'
import { FeatureGrid } from './FeatureGrid'
import { ZeroBanner } from './ZeroBanner'

export const EstatesSection = () => (
    <section id="estates" className="bg-teal-100 py-24 max-[680px]:py-16">
        <div className="wrap grid grid-cols-1 items-center gap-8 min-[981px]:grid-cols-[0.95fr_1.05fr] min-[981px]:gap-14">
            <Reveal>
                <SectionHeader
                    eyebrow={estatesSection.eyebrow}
                    title={estatesSection.title}
                    description={estatesSection.description}
                    eyebrowMuted
                    className="mb-0"
                />
                <ZeroBanner />
            </Reveal>

            <FeatureGrid />
        </div>
    </section>
)
