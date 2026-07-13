import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { financingCards, financingSection } from '@/data/financing'
import { FinCard } from './FinCard'
import { FlowSteps } from './FlowSteps'

export const FinancingSection = () => (
    <section
        id="financing"
        className="bg-[linear-gradient(165deg,var(--color-teal-900),var(--color-teal-800))] py-24 text-white max-[680px]:py-16"
    >
        <div className="wrap">
            <Reveal>
                <SectionHeader
                    eyebrow={financingSection.eyebrow}
                    title={financingSection.title}
                    description={financingSection.description}
                    variant="dark"
                />
            </Reveal>

            <Reveal>
                <FlowSteps />
            </Reveal>

            <div className="grid grid-cols-1 gap-[22px] min-[981px]:grid-cols-[1.4fr_1fr]">
                {financingCards.map((card) => (
                    <Reveal key={card.id}>
                        <FinCard card={card} />
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
)
