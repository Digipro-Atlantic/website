import { Fragment } from 'react'
import { useReducedMotion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { Container } from '@/components/Container'
import { ecosystem } from '@/data/platform'
import { useSequentialReveal } from '@/hooks/useSequentialReveal'
import { EcosystemIllustration } from './EcosystemIllustration'

const enter =
    'transition-[opacity,translate] duration-700 ease-out will-change-[opacity,translate]'
const shown = 'translate-x-0 translate-y-0 opacity-100'

type Item = (typeof ecosystem.items)[number]

const EcosystemItem = ({
    item,
    revealed,
    hiddenClass,
    onEnter,
}: {
    item: Item
    revealed: boolean
    hiddenClass: string
    onEnter: () => void
}) => {
    // Waits until the item is a third of the way up the screen, so each scroll step reveals the next.
    const { ref } = useInView({
        triggerOnce: true,
        rootMargin: '0px 0px -33% 0px',
        onChange: (inView) => {
            if (inView) onEnter()
        },
    })

    return (
        <li
            ref={ref}
            className={`p-6 md:py-5 xl:pt-6 xl:pb-10 ${enter} ${revealed ? shown : hiddenClass}`}
        >
            <h3 className="text-body-lg font-semibold text-grey-900 xl:text-h6">
                {item.title}
            </h3>
            <p className="mt-6 text-body text-grey-700 md:mt-4 md:text-body-sm xl:mt-6 xl:text-body-lg">
                {item.description}
            </p>
        </li>
    )
}

/**
 * Figma "Ecosystem and reach" (Parralax2). The photo rises in, then its line
 * draws out of the tablet and closes the padlock (see EcosystemIllustration).
 * The items slide in from the right in order as the reader scrolls to each,
 * like the "What Zebul is" points on the home page; one column rises instead.
 * Reduced motion fades.
 */
export const Ecosystem = () => {
    const reduce = useReducedMotion()
    // Fires once, when the photo's top is 15% above the bottom of the viewport.
    const image = useInView({
        triggerOnce: true,
        rootMargin: '0px 0px -15% 0px',
    })
    const items = useSequentialReveal(ecosystem.items.length, image.inView)
    const hidden = (from: string) =>
        reduce ? 'opacity-0' : `opacity-0 ${from}`

    return (
        <Container className="mt-20 overflow-x-clip md:mt-24 xl:mt-36">
            <section aria-labelledby="ecosystem-title">
                <div className="mx-auto flex max-w-250 flex-col items-center gap-4 text-center">
                    <p className="text-body-lg font-medium text-[#0c1017] md:text-h6 xl:text-h5">
                        {ecosystem.label}
                    </p>
                    <h2
                        id="ecosystem-title"
                        className="text-h5 font-semibold text-primary-900 md:text-h1 xl:text-display-sm"
                    >
                        {ecosystem.title.map((line, index) => (
                            <Fragment key={line}>
                                {index > 0 && (
                                    <br className="hidden md:inline" />
                                )}
                                {index > 0 && ' '}
                                {line}
                            </Fragment>
                        ))}
                    </h2>
                    <p className="text-body text-grey-700 md:max-w-[789px] xl:max-w-none xl:text-body-lg">
                        {ecosystem.description.map((line, index) => (
                            <Fragment key={line}>
                                {index > 0 && (
                                    <br className="hidden xl:inline" />
                                )}
                                {index > 0 && ' '}
                                {line}
                            </Fragment>
                        ))}
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:mt-18 md:grid-cols-2 md:items-start md:gap-4 xl:mt-34 xl:grid-cols-[1.037fr_1fr] xl:gap-14">
                    <div
                        ref={image.ref}
                        className={`${enter} ${image.inView ? shown : hidden('translate-y-6')}`}
                    >
                        <EcosystemIllustration play={image.inView} />
                    </div>
                    {/* Figma starts the list ~20px below the photo's top edge. */}
                    <ul className="divide-y divide-grey-300 md:mt-5">
                        {ecosystem.items.map((item, index) => (
                            <EcosystemItem
                                key={item.id}
                                item={item}
                                revealed={index < items.revealed}
                                hiddenClass={hidden(
                                    'translate-y-6 md:translate-y-0 md:translate-x-30',
                                )}
                                onEnter={() => items.markEntered(index)}
                            />
                        ))}
                    </ul>
                </div>
            </section>
        </Container>
    )
}
