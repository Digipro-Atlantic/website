import { EcoCard } from '@/components/EcoCard'
import { SectionHeader } from '@/components/SectionHeader'
import { ecoCards } from '@/data/eco-cards'
import { ecoSection } from '@/data/home'

export const EcoSection = () => (
    <section id="more" className="bg-cream py-24 max-[680px]:py-16">
        <div className="wrap">
            <SectionHeader
                eyebrow={ecoSection.eyebrow}
                title={ecoSection.title}
                description={ecoSection.description}
            />

            <div className="eco">
                {ecoCards.map((card) => (
                    <EcoCard key={card.to} card={card} />
                ))}
            </div>
        </div>
    </section>
)
