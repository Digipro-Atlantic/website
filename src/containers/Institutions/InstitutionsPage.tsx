import { CtaBanner } from '@/components/CtaBanner'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import { FeatureGrid } from '@/containers/Platform'
import { institutionItems, institutionsHero } from '@/data/institutions'

export const InstitutionsPage = () => (
    <Page>
        <PageHero
            label={institutionsHero.label}
            title={institutionsHero.title}
            description={institutionsHero.description}
        />
        <FeatureGrid
            items={institutionItems}
            className="mt-11 md:mt-16 xl:mt-29"
        />
        <CtaBanner />
    </Page>
)
