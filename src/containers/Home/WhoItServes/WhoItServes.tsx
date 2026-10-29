import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { motion, useReducedMotion } from 'motion/react'
import cardBg from '@/assets/home/serves-card-bg.svg'
import checkIcon from '@/assets/icons/check-circle.svg'
import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import { whoItServes } from '@/data/home'

type Segment = (typeof whoItServes.segments)[number]

const SegmentPanel = ({ segment }: { segment: Segment }) => {
    const reduce = useReducedMotion()

    return (
        <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        >
            <Container className="grid gap-10 py-10 sm:py-16 md:grid-cols-[539fr_788fr] md:items-stretch md:gap-0 xl:py-20">
                {/* Glass card with a clipped corner (Figma "Rectangle 28"). */}
                <div className="relative px-8 pt-8 pb-16 text-white md:pb-10 xl:p-10">
                    <img
                        src={cardBg}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 size-full drop-shadow-xs"
                    />
                    <div className="relative flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-h4 font-semibold xl:text-h2">
                                {segment.title}
                            </h3>
                            <p className="text-body-sm sm:text-body">
                                {segment.description}
                            </p>
                        </div>
                        <ul className="flex flex-col gap-4">
                            {segment.points.map((point) => (
                                <li
                                    key={point}
                                    className="flex items-start gap-2 text-body-sm sm:text-body"
                                >
                                    <img
                                        src={checkIcon}
                                        alt=""
                                        width={24}
                                        height={24}
                                        className="size-6 shrink-0"
                                    />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Layered glass panes with the product screen on top. */}
                <div className="relative aspect-[788/495] w-full self-center">
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-[rgb(3_76_63/0)] from-11% to-[rgb(0_91_76/0.3)] to-58% xl:rounded-[2rem]" />
                    <div className="absolute top-[7.88%] left-[12.06%] h-[80.81%] w-[80.84%] rounded-2xl bg-linear-to-b from-[rgb(3_76_63/0)] from-11% to-[rgb(0_91_76/0.5)] to-[46.67%] xl:rounded-[2rem]" />
                    {/* The export has the panel gradient baked in; crop to the card and redo its shadow. */}
                    <div className="absolute top-[16.7%] left-1/2 aspect-[450/281] w-[70%] -translate-x-1/2 overflow-hidden rounded-lg shadow-[0_48px_52px_-15px_rgb(16_25_40/0.3),0_0_3px_-1px_rgb(16_25_40/0.04),0_0_0_1px_rgb(16_25_40/0.05)] xl:w-[57.1%]">
                        <img
                            src={segment.image}
                            alt={segment.imageAlt}
                            width={524}
                            height={367}
                            loading="lazy"
                            className="absolute top-[-0.712%] left-[-8.222%] w-[116.444%] max-w-none"
                        />
                    </div>
                </div>
            </Container>
        </motion.div>
    )
}

export const WhoItServes = () => (
    <section className="mt-20 sm:mt-24 xl:mt-36">
        <Container>
            <SectionIntro
                label={whoItServes.label}
                title={whoItServes.title}
                description={whoItServes.description}
            />
        </Container>

        <TabGroup className="mt-12 md:mt-18 xl:mt-20">
            <Container>
                <TabList className="-mx-4 flex gap-8 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-10 sm:px-10 md:mx-0 md:justify-between md:overflow-visible md:px-0">
                    {whoItServes.segments.map((segment) => (
                        <Tab
                            key={segment.id}
                            className="relative shrink-0 pb-2 text-body font-semibold whitespace-nowrap text-grey-700 uppercase transition-colors duration-150 ease-[ease] hover:text-grey-900 xl:text-body-lg"
                        >
                            {({ selected }) => (
                                <>
                                    {segment.tab}
                                    {selected && (
                                        <motion.span
                                            layoutId="who-it-serves-tab"
                                            transition={{
                                                type: 'spring',
                                                duration: 0.35,
                                                bounce: 0,
                                            }}
                                            className="absolute inset-x-0 bottom-0 h-px bg-primary-400"
                                        />
                                    )}
                                </>
                            )}
                        </Tab>
                    ))}
                </TabList>
            </Container>

            <TabPanels className="mt-6 bg-linear-to-r from-primary-400 from-53% to-[#0b2720] to-96% md:mt-8 xl:mt-10">
                {whoItServes.segments.map((segment) => (
                    <TabPanel key={segment.id}>
                        <SegmentPanel segment={segment} />
                    </TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    </section>
)
