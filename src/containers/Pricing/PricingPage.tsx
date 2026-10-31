import { useState } from 'react'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { CtaBanner } from '@/components/CtaBanner'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import {
    additionalFees,
    comparison,
    pricingHero,
    institutionalBand,
    pricingNotes,
} from '@/data/pricing'
import type { BillingPeriod } from '@/data/pricing'
import { BillingToggle } from './BillingToggle'
import { ComparisonTable } from './ComparisonTable'
import { FeesTable } from './FeesTable'
import { SectionHeading } from './SectionHeading'
import { TierCards } from './TierCards'

const sectionGap = 'mt-20 md:mt-18 xl:mt-36'

export const PricingPage = () => {
    const [period, setPeriod] = useState<BillingPeriod>('monthly')

    return (
        <Page>
            <PageHero
                label={pricingHero.label}
                title={pricingHero.title}
                description={pricingHero.description}
                // Figma: 24px gaps on desktop; the lead wraps naturally at 396px (phone), 856px (tablet), 935px (desktop).
                titleClassName="max-w-99 sm:max-w-none xl:mt-6"
                descriptionClassName="mt-4 max-w-99 sm:max-w-235 md:max-w-214 xl:mt-6 xl:max-w-[935px]"
            >
                <BillingToggle
                    value={period}
                    onChange={setPeriod}
                    className="mt-8 md:mt-12 xl:mt-10"
                />
            </PageHero>

            <Container>
                <TierCards period={period} />
            </Container>

            <Container className={sectionGap}>
                <SectionHeading
                    label={comparison.label}
                    title={comparison.title}
                    description={comparison.description}
                />
                <div className="mt-12 xl:mt-20">
                    <ComparisonTable
                        period={period}
                        onPeriodChange={setPeriod}
                    />
                </div>

                <ul className="mt-8 max-w-[1234px] list-disc pl-8 text-body-sm text-grey-700 md:pl-6 md:text-body xl:pl-7 xl:text-body-lg">
                    {pricingNotes.map((note) => (
                        <li key={note}>{note}</li>
                    ))}
                </ul>
            </Container>

            <Container className={sectionGap}>
                <SectionHeading
                    title={additionalFees.title}
                    description={additionalFees.description}
                />
                <div className="mt-11 xl:mt-16">
                    <FeesTable />
                </div>
                <p className="mt-8 text-body text-grey-700 xl:text-body-lg">
                    {additionalFees.vatNote}
                </p>
            </Container>

            <Container className="mt-16 text-center xl:mt-24">
                <h2 className="text-h4 font-semibold text-balance text-primary-900 md:text-h1 xl:text-display-sm">
                    {institutionalBand.title}
                </h2>
                <p className="mx-auto mt-3 max-w-251 text-body text-grey-700 xl:text-body-lg">
                    {institutionalBand.description}
                </p>
                <Button
                    link={institutionalBand.cta}
                    className="mt-8 w-55 xl:mt-10 xl:h-16 xl:w-62.5"
                />
            </Container>

            <CtaBanner />
        </Page>
    )
}
