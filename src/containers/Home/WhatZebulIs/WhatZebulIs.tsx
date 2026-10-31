import { useReducedMotion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import { whatZebulIs } from '@/data/home'
import { useSequentialReveal } from '@/hooks/useSequentialReveal'
import { PaperPlaneIllustration } from './PaperPlaneIllustration'

// Fires once, when the element's top is 15% above the bottom of the viewport.
const inViewOptions = { triggerOnce: true, rootMargin: '0px 0px -15% 0px' }
// Points wait until they are a third of the way up the screen, so each scroll step reveals the next.
const pointInViewOptions = {
    triggerOnce: true,
    rootMargin: '0px 0px -33% 0px',
}

const enter =
    'transition-[opacity,translate] duration-700 ease-out will-change-[opacity,translate]'
const shown = 'translate-x-0 translate-y-0 opacity-100'

type Point = (typeof whatZebulIs.points)[number]

const PointItem = ({
    point,
    isLast,
    revealed,
    hiddenClass,
    onEnter,
}: {
    point: Point
    isLast: boolean
    revealed: boolean
    hiddenClass: string
    onEnter: () => void
}) => {
    const { ref } = useInView({
        ...pointInViewOptions,
        onChange: (inView) => {
            if (inView) onEnter()
        },
    })

    return (
        <div
            ref={ref}
            className={`flex flex-col gap-6 p-6 md:min-h-35.5 md:gap-4 md:py-4 xl:min-h-47.5 xl:gap-6 xl:py-6 ${
                isLast ? '' : 'border-b border-border-strong'
            } ${enter} ${revealed ? shown : hiddenClass}`}
        >
            <h3 className="text-body-lg font-semibold text-grey-900 xl:text-h6">
                {point.title}
            </h3>
            <p className="text-body text-grey-700 md:text-body-sm xl:text-body-lg">
                {point.description}
            </p>
        </div>
    )
}

/**
 * Figma "Parralax home" (10478:31066): the heading drops in from above, the
 * illustration comes from the left, then each point slides in from the right
 * as the reader scrolls to it. Points are released strictly in order, so a
 * fast scroll still reads 1 → 2 → 3. Travel is shortened from the prototype's
 * off-screen starts; one-column layouts rise from below. Reduced motion fades.
 */
export const WhatZebulIs = () => {
    const reduce = useReducedMotion()
    const intro = useInView(inViewOptions)
    const image = useInView(inViewOptions)

    // Point 1 lets the illustration land first (400ms); then at least 150ms between points.
    const points = useSequentialReveal(whatZebulIs.points.length, image.inView)

    const hidden = (motion: string) =>
        reduce ? 'opacity-0' : `opacity-0 ${motion}`

    return (
        <Container className="mt-20 overflow-x-clip sm:mt-24 xl:mt-36">
            <section aria-label={whatZebulIs.label}>
                <div
                    ref={intro.ref}
                    className={`${enter} ${intro.inView ? shown : hidden('-translate-y-10')}`}
                >
                    <SectionIntro
                        label={whatZebulIs.label}
                        title={whatZebulIs.title}
                        description={whatZebulIs.description}
                        className="xl:max-w-[935px]"
                    />
                </div>

                <div className="mt-12 grid items-center gap-8 md:mt-18 md:grid-cols-2 md:gap-4 xl:mt-32 xl:grid-cols-[679fr_625fr] xl:gap-6">
                    <div
                        ref={image.ref}
                        className={`${enter} ${
                            image.inView
                                ? shown
                                : hidden(
                                      'translate-y-6 md:translate-y-0 md:-translate-x-30',
                                  )
                        }`}
                    >
                        <PaperPlaneIllustration play={image.inView} />
                    </div>

                    <div>
                        {whatZebulIs.points.map((point, index) => (
                            <PointItem
                                key={point.title}
                                point={point}
                                isLast={index === whatZebulIs.points.length - 1}
                                revealed={index < points.revealed}
                                hiddenClass={hidden(
                                    'translate-y-6 md:translate-y-0 md:translate-x-30',
                                )}
                                onEnter={() => points.markEntered(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </Container>
    )
}
