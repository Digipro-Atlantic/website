import illustration from '@/assets/home/what-zebul-is.png'
import { Container } from '@/components/Container'
import { RevealGroup, RevealItem } from '@/components/Reveal'
import { SectionIntro } from '@/components/SectionIntro'
import { whatZebulIs } from '@/data/home'

export const WhatZebulIs = () => (
    <Container className="mt-20 sm:mt-24 xl:mt-36">
        <section aria-label={whatZebulIs.label}>
            <SectionIntro
                label={whatZebulIs.label}
                title={whatZebulIs.title}
                description={whatZebulIs.description}
            />

            {/* Figma "Parralax home": illustration and points slide in as the section scrolls into view. */}
            <RevealGroup className="mt-12 grid items-center gap-8 md:mt-18 md:grid-cols-2 md:gap-4 xl:mt-32 xl:grid-cols-[679fr_625fr] xl:gap-6">
                <RevealItem>
                    <img
                        src={illustration}
                        alt="A property manager smiling at her laptop"
                        width={1016}
                        height={718}
                        loading="lazy"
                        className="h-auto w-full"
                    />
                </RevealItem>

                <div>
                    {whatZebulIs.points.map((point, index) => (
                        <RevealItem
                            key={point.title}
                            className={`flex flex-col gap-6 p-6 md:gap-4 md:py-4 xl:gap-6 xl:py-6 ${
                                index < whatZebulIs.points.length - 1
                                    ? 'border-b border-border-strong'
                                    : ''
                            }`}
                        >
                            <h3 className="text-h6 font-semibold text-grey-900">
                                {point.title}
                            </h3>
                            <p className="text-body text-grey-700 md:text-body-sm xl:text-body-lg">
                                {point.description}
                            </p>
                        </RevealItem>
                    ))}
                </div>
            </RevealGroup>
        </section>
    </Container>
)
