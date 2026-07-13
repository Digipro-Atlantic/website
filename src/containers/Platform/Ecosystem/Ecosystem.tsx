import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { ecosystemCards, ecosystemSection } from '@/data/platform'
import { EcosystemCard } from './EcosystemCard'

export const Ecosystem = () => (
    <section id="ecosystem" className="bg-cream py-24 max-[680px]:py-16">
        <div className="wrap">
            <Reveal>
                <SectionHeader
                    eyebrow={ecosystemSection.eyebrow}
                    title={ecosystemSection.title}
                    description={ecosystemSection.description}
                />
            </Reveal>

            <div className="grid grid-cols-1 gap-[22px] min-[681px]:grid-cols-3">
                {ecosystemCards.map((card) => (
                    <Reveal key={card.id}>
                        <EcosystemCard card={card} />
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
)
