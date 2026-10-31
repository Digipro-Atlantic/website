import { CtaBanner } from '@/components/CtaBanner'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import { FeatureGrid } from '@/containers/Platform'
import { estateFeatures, estatesHero } from '@/data/estates'

export const EstatesPage = () => (
    <Page>
        <PageHero
            label={estatesHero.label}
            title={estatesHero.title}
            // Figma sets the title on one line, wider than the 1328px column.
            titleClassName="xl:w-max"
            description={estatesHero.description}
            // Figma lets the lead wrap unbalanced: 400px (phone), 728px (tablet), 935px (desktop).
            descriptionClassName="mt-4 max-w-100 md:max-w-182 xl:max-w-[935px]"
        />
        <FeatureGrid
            items={estateFeatures}
            centerLast
            hoverable
            descriptionClassName="mt-6 md:mt-4"
            className="mt-12 md:mt-18 xl:mt-24"
        />
        <CtaBanner />
    </Page>
)
