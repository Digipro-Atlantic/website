import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { CtaBanner } from '@/components/CtaBanner'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import { financingBoundaries, financingHero } from '@/data/financing'
import { FinancingFlow } from './FinancingFlow'

const { role, score } = financingBoundaries

export const FinancingPage = () => (
    <Page>
        <PageHero
            label={financingHero.label}
            title={financingHero.title}
            description={financingHero.description}
            // Figma: 24px gaps on desktop; the lead wraps naturally at 781px (tablet) / 892px (desktop).
            titleClassName="xl:mt-6"
            descriptionClassName="mt-4 md:max-w-[781px] xl:mt-6 xl:max-w-[880px]"
        />

        <FinancingFlow />

        <Container className="mt-20 md:mt-36 xl:mt-44">
            <section aria-labelledby="financing-boundaries">
                <div className="mx-auto flex max-w-241 flex-col items-center gap-4 text-center">
                    <p className="text-body-lg font-medium text-[#0c1017] md:text-h6 xl:text-h5">
                        {financingBoundaries.label}
                    </p>
                    <h2
                        id="financing-boundaries"
                        className="max-w-80 text-h4 font-semibold text-balance text-primary-900 sm:max-w-none md:text-h1 xl:text-display-sm"
                    >
                        {financingBoundaries.title}
                    </h2>
                </div>

                <div className="mt-12 grid gap-6 md:mt-18 md:grid-cols-2 md:gap-4 xl:mt-26 xl:gap-6">
                    <Card raised className="flex flex-col p-6 md:p-8 xl:p-12">
                        <h3 className="text-h5 font-semibold text-grey-900 md:text-h6 xl:text-h3">
                            {role.title}
                        </h3>
                        <p className="mt-8 text-body-sm text-grey-600 md:mt-6 xl:text-body-lg">
                            {role.description}
                        </p>
                        <hr className="mt-6 border-grey-300 md:mt-4 xl:mt-6" />
                        <p className="mt-10 border-l-2 border-primary-400 pl-6 text-caption text-grey-600 md:mt-4 md:pl-4.5 xl:mt-6 xl:pl-6 xl:text-body">
                            {role.note}
                        </p>
                    </Card>

                    <Card raised className="p-6 md:p-8 xl:p-12">
                        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
                            <h3 className="text-h5 font-semibold text-grey-900 md:text-h6 xl:text-h3">
                                {score.title}
                            </h3>
                            <span className="inline-flex h-8 shrink-0 items-center rounded-full bg-primary-400 px-3 text-body-sm text-white uppercase md:h-6 md:text-caption xl:h-8 xl:px-4 xl:text-body-sm">
                                {score.badge}
                            </span>
                        </div>
                        <p className="mt-6 text-display-sm font-medium text-primary-400 md:mt-4 md:text-h2 xl:mt-6 xl:text-display-lg">
                            {score.value}
                        </p>
                        <p className="mt-4 text-body-sm text-grey-600 uppercase md:text-caption xl:text-body-lg">
                            {score.caption}
                        </p>
                        <p className="mt-6 text-body text-grey-600 md:mt-4 md:text-body-sm xl:mt-6 xl:text-body-lg">
                            {score.description}
                        </p>
                    </Card>
                </div>
            </section>
        </Container>

        <CtaBanner />
    </Page>
)
