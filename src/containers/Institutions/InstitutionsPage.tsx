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
            // Figma lets the lead wrap unbalanced: full width (phone), 796px (tablet), 935px (desktop).
            descriptionClassName="mt-4 md:max-w-199 xl:max-w-[935px]"
        />
        <FeatureGrid
            items={institutionItems}
            hoverable
            className="mt-12 md:mt-18 xl:mt-24"
        />
        <CtaBanner />
    </Page>
)
