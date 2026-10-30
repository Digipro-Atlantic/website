import { useReducedMotion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import arrowRight from '@/assets/icons/arrow-right.svg'
import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import { SiteLink } from '@/components/SiteLink'
import { explore } from '@/data/home'

const { cards } = explore
// A lone card on the last row of three sits in the middle column, as in Figma.
const centreLast = cards.length % 3 === 1

/**
 * Figma "Find your way around": seven cards, three per row from tablet up.
 * Hover (Figma Variant2) swaps the grey shadow for a green glow, greens the
 * title, darkens the link and nudges the arrow 4px. Keyboard focus matches.
 * Only the heading animates, dropping in like the sections above; the cards
 * are navigation and stay put. Reduced motion fades.
 */
export const Explore = () => {
    const reduce = useReducedMotion()
    // Fires once, when the heading's top is 15% above the bottom of the viewport.
    const intro = useInView({
        triggerOnce: true,
        rootMargin: '0px 0px -15% 0px',
    })

    return (
        <Container className="mt-20 sm:mt-24 xl:mt-36">
            <section aria-label={explore.label}>
                <div
                    ref={intro.ref}
                    className={`transition-[opacity,translate] duration-700 ease-out will-change-[opacity,translate] ${
                        intro.inView
                            ? 'translate-y-0 opacity-100'
                            : reduce
                              ? 'opacity-0'
                              : '-translate-y-10 opacity-0'
                    }`}
                >
                    <SectionIntro
                        label={explore.label}
                        title={explore.title}
                        description={explore.description}
                    />
                </div>

                <ul className="mt-12 grid gap-4 md:mt-18 md:grid-cols-3 xl:mt-31 xl:gap-6">
                    {cards.map((card, index) => (
                        <li
                            key={card.title}
                            className={
                                centreLast && index === cards.length - 1
                                    ? 'md:col-start-2'
                                    : undefined
                            }
                        >
                            <SiteLink
                                link={card.link}
                                className="group flex h-full flex-col rounded-lg border border-grey-100 bg-white p-8 shadow-[0_-6px_24px_0_rgb(17_17_17/0.08)] transition-shadow duration-200 ease-[ease] hover:shadow-[0_1px_80px_0_rgb(0_91_76/0.2)] focus-visible:shadow-[0_1px_80px_0_rgb(0_91_76/0.2)] xl:py-10 xl:pr-6 xl:pl-14"
                            >
                                <h3 className="text-h6 font-semibold text-grey-900 transition-colors duration-200 ease-[ease] group-hover:text-primary-400 group-focus-visible:text-primary-400 md:text-body-lg xl:text-h5">
                                    {card.title}
                                </h3>
                                <p className="mt-6 text-body text-grey-600 md:mt-4 md:text-body-sm xl:mt-6 xl:text-body-lg">
                                    {card.description}
                                </p>
                                <span className="mt-auto inline-flex items-center gap-4 pt-6 text-body text-primary-400 transition-colors duration-200 ease-[ease] group-hover:text-primary-500 group-focus-visible:text-primary-500 md:gap-3 md:pt-4 md:text-body-sm xl:gap-4 xl:pt-8 xl:text-body-lg">
                                    {card.link.label}
                                    <img
                                        src={arrowRight}
                                        alt=""
                                        width={24}
                                        height={24}
                                        className="size-6 transition-transform duration-200 ease-[ease] group-hover:translate-x-1 group-focus-visible:translate-x-1 md:size-4.25 xl:size-6"
                                    />
                                </span>
                            </SiteLink>
                        </li>
                    ))}
                </ul>
            </section>
        </Container>
    )
}
