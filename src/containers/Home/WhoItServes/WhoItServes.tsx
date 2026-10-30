import { type ReactNode, useEffect, useRef, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { motion, useReducedMotion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import cardBg from '@/assets/home/serves-card-bg.svg'
import checkIcon from '@/assets/icons/check-circle.svg'
import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import { whoItServes } from '@/data/home'
import { SegmentScreens } from './SegmentScreens'

type Segment = (typeof whoItServes.segments)[number]

// Fires once, when the element's top is 15% above the bottom of the viewport.
const inViewOptions = { triggerOnce: true, rootMargin: '0px 0px -15% 0px' }
// Card copy lands after the card itself; each line follows the last by this much.
const COPY_DELAY_MS = 150
const COPY_STAGGER_MS = 40

const enter =
    'transition-[opacity,translate] duration-700 ease-out will-change-[opacity,translate]'
const shown = 'translate-x-0 translate-y-0 opacity-100'

/**
 * One line of card copy. It staggers in on the first reveal, and again via
 * @starting-style whenever a tab change mounts a fresh panel.
 */
const CopyLine = ({
    as: Tag = 'p',
    order,
    revealed,
    reduce,
    className = '',
    children,
}: {
    as?: 'p' | 'h3' | 'li'
    order: number
    revealed: boolean
    reduce: boolean
    className?: string
    children: ReactNode
}) => {
    const from = reduce ? 'opacity-0' : 'translate-y-2 opacity-0'
    const startFrom = reduce
        ? 'starting:opacity-0'
        : 'starting:translate-y-2 starting:opacity-0'
    return (
        <Tag
            style={{
                transitionDelay: `${COPY_DELAY_MS + order * COPY_STAGGER_MS}ms`,
            }}
            className={`transition-[opacity,translate] duration-500 ease-out ${startFrom} ${
                revealed ? 'translate-y-0 opacity-100' : from
            } ${className}`}
        >
            {children}
        </Tag>
    )
}

const SegmentCopy = ({
    segment,
    revealed,
    reduce,
}: {
    segment: Segment
    revealed: boolean
    reduce: boolean
}) => (
    <div className="relative flex flex-col gap-5 xl:gap-6">
        <div className="flex flex-col gap-3 xl:gap-4">
            <CopyLine
                as="h3"
                order={0}
                revealed={revealed}
                reduce={reduce}
                className="text-h4 font-semibold xl:text-h2"
            >
                {segment.title}
            </CopyLine>
            <CopyLine
                order={1}
                revealed={revealed}
                reduce={reduce}
                className="text-body-sm xl:text-body"
            >
                {segment.description}
            </CopyLine>
        </div>
        <ul className="flex flex-col gap-3 xl:gap-4">
            {segment.points.map((point, index) => (
                <CopyLine
                    key={point}
                    as="li"
                    order={index + 2}
                    revealed={revealed}
                    reduce={reduce}
                    className="flex items-start gap-1.5 text-body-sm xl:gap-2 xl:text-body"
                >
                    <img
                        src={checkIcon}
                        alt=""
                        width={24}
                        height={24}
                        className="size-5 shrink-0 xl:size-6"
                    />
                    {point}
                </CopyLine>
            ))}
        </ul>
    </div>
)

/**
 * Figma "Who it serves" (10473:29518). The intro drops in, the card rises,
 * the glass panes and screen land, and the screen's metric row lifts out of
 * it. Tabs advance on their own (the underline fills as a timer); picking a
 * tab restarts the timer from there. It pauses on hover, off-screen and in
 * background tabs, and is off for reduced motion.
 */
export const WhoItServes = () => {
    const reduce = useReducedMotion() ?? false
    const intro = useInView(inViewOptions)
    const band = useInView(inViewOptions)
    const onScreen = useInView({ threshold: 0.25 })
    const [selected, setSelected] = useState(0)
    const [hovered, setHovered] = useState(false)
    const [pageHidden, setPageHidden] = useState(false)
    const tabListRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onVisibility = () => setPageHidden(document.hidden)
        document.addEventListener('visibilitychange', onVisibility)
        return () =>
            document.removeEventListener('visibilitychange', onVisibility)
    }, [])

    // Keep the active tab in view on phones, where the tab row scrolls sideways.
    useEffect(() => {
        const list = tabListRef.current
        const tab = list?.querySelector<HTMLElement>('[data-selected]')
        if (!list || !tab || list.scrollWidth <= list.clientWidth) return
        const offset =
            tab.getBoundingClientRect().left - list.getBoundingClientRect().left
        list.scrollTo({
            left: list.scrollLeft + offset - 16,
            behavior: reduce ? 'auto' : 'smooth',
        })
    }, [selected, reduce])

    const autoAdvance = !reduce
    const paused = !band.inView || !onScreen.inView || hovered || pageHidden
    const advance = () =>
        setSelected((current) => (current + 1) % whoItServes.segments.length)

    const hidden = (from: string) =>
        reduce ? 'opacity-0' : `opacity-0 ${from}`

    return (
        <section
            className="mt-20 sm:mt-24 xl:mt-36"
            onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') setHovered(true)
            }}
            onPointerLeave={() => setHovered(false)}
        >
            <Container>
                <div
                    ref={intro.ref}
                    className={`${enter} ${intro.inView ? shown : hidden('-translate-y-10')}`}
                >
                    <SectionIntro
                        label={whoItServes.label}
                        title={whoItServes.title}
                        description={whoItServes.description}
                    />
                </div>
            </Container>

            <TabGroup
                selectedIndex={selected}
                onChange={setSelected}
                className="mt-12 md:mt-18 xl:mt-20"
            >
                <Container>
                    <TabList
                        ref={tabListRef}
                        className={`-mx-4 flex gap-6 overflow-x-auto px-4 delay-150 [scrollbar-width:none] sm:-mx-10 sm:px-10 md:mx-0 md:justify-between md:overflow-visible md:px-0 ${enter} ${
                            intro.inView ? shown : hidden('translate-y-2')
                        }`}
                    >
                        {whoItServes.segments.map((segment, index) => (
                            <Tab
                                key={segment.id}
                                className="relative shrink-0 pb-1 text-body-sm outline-none data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-ring font-semibold whitespace-nowrap text-grey-700 uppercase transition-colors duration-150 ease-[ease] hover:text-grey-900 md:pb-2 md:text-body xl:text-body-lg"
                            >
                                {segment.tab}
                                {index === selected && (
                                    <motion.span
                                        layoutId="who-it-serves-tab"
                                        transition={{
                                            type: 'spring',
                                            duration: 0.35,
                                            bounce: 0,
                                        }}
                                        className={`absolute inset-x-0 bottom-0 h-px ${
                                            autoAdvance
                                                ? 'bg-primary-400/25'
                                                : 'bg-primary-400'
                                        }`}
                                    >
                                        {autoAdvance && (
                                            <span
                                                key={selected}
                                                onAnimationEnd={advance}
                                                className={`absolute inset-0 origin-left animate-tab-progress bg-primary-400 ${
                                                    paused
                                                        ? '[animation-play-state:paused]'
                                                        : ''
                                                }`}
                                            />
                                        )}
                                    </motion.span>
                                )}
                            </Tab>
                        ))}
                    </TabList>
                </Container>

                <div
                    ref={(el) => {
                        band.ref(el)
                        onScreen.ref(el)
                    }}
                    className="mt-12 bg-linear-to-r from-primary-400 from-53% to-[#0b2720] to-96% md:mt-8 xl:mt-10"
                >
                    <Container className="grid pt-8 pb-7 md:grid-cols-[464fr_480fr] md:py-20 xl:grid-cols-[539fr_788fr]">
                        {/* Glass card with a clipped corner (Figma "Rectangle 28"). */}
                        <div
                            className={`relative min-h-94 p-8 text-white xl:p-10 ${enter} ${
                                band.inView ? shown : hidden('translate-y-6')
                            }`}
                        >
                            <img
                                src={cardBg}
                                alt=""
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 size-full drop-shadow-xs"
                            />
                            <TabPanels>
                                {whoItServes.segments.map((segment) => (
                                    <TabPanel key={segment.id}>
                                        <SegmentCopy
                                            segment={segment}
                                            revealed={band.inView}
                                            reduce={reduce}
                                        />
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </div>

                        <SegmentScreens
                            index={selected}
                            revealed={band.inView}
                        />
                    </Container>
                </div>
            </TabGroup>
        </section>
    )
}
