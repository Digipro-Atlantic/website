import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { capabilities, capabilitiesSection } from '@/data/platform'
import { CapabilityCard } from './CapabilityCard'

export const Capabilities = () => (
    <section id="platform" className="bg-cream py-24 max-[680px]:py-16">
        <div className="wrap">
            <Reveal>
                <SectionHeader
                    eyebrow={capabilitiesSection.eyebrow}
                    title={capabilitiesSection.title}
                    description={capabilitiesSection.description}
                />
            </Reveal>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-line bg-line min-[681px]:max-[960px]:grid-cols-2 min-[961px]:grid-cols-3">
                {capabilities.map((capability) => (
                    <Reveal key={capability.id} className="h-full">
                        <CapabilityCard capability={capability} />
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
)
