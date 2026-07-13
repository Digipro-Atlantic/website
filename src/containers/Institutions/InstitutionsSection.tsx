import { Reveal } from '@/components/Reveal'
import { SecGrid } from '@/components/SecGrid'
import { SectionHeader } from '@/components/SectionHeader'
import { institutionItems, institutionsSection } from '@/data/institutions'

export const InstitutionsSection = () => (
    <section id="institutions" className="bg-teal-100 py-24 max-[680px]:py-16">
        <div className="wrap">
            <Reveal>
                <SectionHeader
                    eyebrow={institutionsSection.eyebrow}
                    title={institutionsSection.title}
                    description={institutionsSection.description}
                />
            </Reveal>

            <SecGrid items={institutionItems} />
        </div>
    </section>
)
