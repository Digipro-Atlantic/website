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
            <Container className="grid pt-8 pb-7 md:grid-cols-[464fr_480fr] md:py-20 xl:grid-cols-[539fr_788fr]">
                {/* Glass card with a clipped corner (Figma "Rectangle 28"). */}
                <div className="relative min-h-94 p-8 text-white xl:p-10">
                    <img
                        src={cardBg}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 size-full drop-shadow-xs"
                    />
                    <div className="relative flex flex-col gap-5 xl:gap-6">
                        <div className="flex flex-col gap-3 xl:gap-4">
                            <h3 className="text-h4 font-semibold xl:text-h2">
                                {segment.title}
                            </h3>
                            <p className="text-body-sm xl:text-body">
                                {segment.description}
                            </p>
                        </div>
                        <ul className="flex flex-col gap-3 xl:gap-4">
                            {segment.points.map((point) => (
                                <li
                                    key={point}
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
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Layered glass panes with the product screen on top. Full bleed on one column. */}
                <div className="relative -mx-4 aspect-[440/276] sm:-mx-10 md:mx-0 md:aspect-auto xl:aspect-[788/495] xl:self-center">
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-[rgb(3_76_63/0)] from-11% to-[rgb(0_91_76/0.3)] to-58% xl:rounded-[2rem]" />
                    <div className="absolute top-[7.8%] left-[15.6%] h-[81%] w-[80%] rounded-2xl bg-linear-to-b from-[rgb(3_76_63/0)] from-11% to-[rgb(0_91_76/0.5)] to-[46.67%] xl:top-[7.88%] xl:left-[12.06%] xl:h-[80.81%] xl:w-[80.84%] xl:rounded-[2rem]" />
                    <div className="absolute top-[10.9%] left-1/2 aspect-[450/281] w-[68.9%] -translate-x-1/2 md:top-[19%] md:w-[73.3%] xl:top-[16.7%] xl:w-[57.1%]">
                        {/* The export has the panel gradient baked in; crop to the card and redo its shadow. */}
                        <div className="absolute inset-0 overflow-hidden rounded-lg shadow-[0_48px_52px_-15px_rgb(16_25_40/0.3),0_0_3px_-1px_rgb(16_25_40/0.04),0_0_0_1px_rgb(16_25_40/0.05)]">
                            <img
                                src={segment.image}
                                alt={segment.imageAlt}
                                width={524}
                                height={367}
                                loading="lazy"
                                className="absolute top-[-0.712%] left-[-8.222%] w-[116.444%] max-w-none"
                            />
                        </div>
                        {/* The screen's metric row, enlarged and lifted off it (Figma "Frame 1618868261"). */}
                        <div
                            aria-hidden="true"
                            className={`absolute left-[3.44%] h-[22.6%] w-[93.15%] scale-[1.32] overflow-hidden rounded-[7px] bg-white shadow-[0_26px_14px_rgb(16_25_40/0.3),0_0_1px_rgb(16_25_40/0.04)] md:scale-[1.21] xl:scale-[1.43] ${segment.metricsClassName}`}
                        >
                            <img
                                src={segment.image}
                                alt=""
                                width={524}
                                height={367}
                                loading="lazy"
                                className={`absolute left-[-12.52%] w-[125%] max-w-none ${segment.metricsImageClassName}`}
                            />
                        </div>
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
                <TabList className="-mx-4 flex gap-6 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-10 sm:px-10 md:mx-0 md:justify-between md:overflow-visible md:px-0">
                    {whoItServes.segments.map((segment) => (
                        <Tab
                            key={segment.id}
                            className="relative shrink-0 pb-1 text-body-sm font-semibold whitespace-nowrap text-grey-700 uppercase transition-colors duration-150 ease-[ease] hover:text-grey-900 md:pb-2 md:text-body xl:text-body-lg"
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

            <TabPanels className="mt-12 bg-linear-to-r from-primary-400 from-53% to-[#0b2720] to-96% md:mt-8 xl:mt-10">
                {whoItServes.segments.map((segment) => (
                    <TabPanel key={segment.id}>
                        <SegmentPanel segment={segment} />
                    </TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    </section>
)
