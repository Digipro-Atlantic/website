import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { models } from '@/data/home'
import { ModelCard } from './ModelCard'

export const Models = () => (
    <section id="models" className="py-24 max-[680px]:py-16">
        <div className="wrap">
            <Reveal>
                <SectionHeader
                    eyebrow={models.eyebrow}
                    title={models.headline}
                    description={models.description}
                />
            </Reveal>

            <div className="grid gap-5 max-[980px]:grid-cols-1 min-[981px]:grid-cols-2">
                {models.cards.map((card) => (
                    <Reveal
                        key={card.title}
                        className={
                            'wide' in card && card.wide
                                ? 'col-span-full'
                                : undefined
                        }
                    >
                        <ModelCard card={card} />
                    </Reveal>
                ))}
            </div>

            <Reveal>
                <p className="mt-8 text-center text-[14.5px] text-ink-soft">
                    {models.tenantNote}
                </p>
            </Reveal>

            <Reveal>
                <div
                    className="mt-10 flex flex-wrap justify-center gap-2.5"
                    aria-label="Supported property types"
                >
                    {models.propertyTypes.map((type) => (
                        <span
                            key={type}
                            className="rounded-full border border-line bg-paper px-4 py-2 text-[13px] font-medium text-teal-800 transition hover:border-teal-400"
                        >
                            <b className="mr-1.5 font-bold text-gold">+</b>
                            {type}
                        </span>
                    ))}
                </div>
            </Reveal>
        </div>
    </section>
)
