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
        />
        <FeatureGrid
            items={estateFeatures}
            centerLast
            className="mt-11 md:mt-16 xl:mt-29"
        />
        <CtaBanner />
    </Page>
)
