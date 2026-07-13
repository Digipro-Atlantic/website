import { EcoCard } from '@/components/EcoCard'
import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { ecoCards } from '@/data/eco-cards'
import { ecoSection } from '@/data/home'

export const EcoSection = () => (
    <section id="more" className="bg-cream py-24 max-[680px]:py-16">
        <div className="wrap">
            <Reveal>
                <SectionHeader
                    eyebrow={ecoSection.eyebrow}
                    title={ecoSection.title}
                    description={ecoSection.description}
                />
            </Reveal>

            <div className="eco">
                {ecoCards.map((card) => (
                    <Reveal key={card.to}>
                        <EcoCard card={card} />
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
)
