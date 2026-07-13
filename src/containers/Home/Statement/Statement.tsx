import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { statement } from '@/data/home'

export const Statement = () => (
    <section
        id="about"
        className="border-y border-line bg-teal-100 py-24 max-[680px]:py-16"
    >
        <div className="wrap grid items-center gap-12 max-[980px]:gap-8 min-[981px]:grid-cols-2 min-[981px]:gap-12">
            <Reveal>
                <SectionHeader
                    eyebrow={statement.eyebrow}
                    title={statement.headline}
                    description={statement.description}
                    eyebrowMuted
                    className="mb-0"
                />
            </Reveal>

            <RevealGroup className="grid gap-5">
                {statement.points.map((point) => (
                    <RevealItem key={point.number}>
                        <div className="flex gap-4">
                            <span className="pt-1 font-mono text-[13px] font-semibold text-gold">
                                {point.number}
                            </span>
                            <div>
                                <h4 className="mb-1 text-base font-semibold">
                                    {point.title}
                                </h4>
                                <p className="text-[14.5px] text-ink-soft">
                                    {point.description}
                                </p>
                            </div>
                        </div>
                    </RevealItem>
                ))}
            </RevealGroup>
        </div>
    </section>
)
