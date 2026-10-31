import { CtaBanner } from '@/components/CtaBanner'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import { platformHero } from '@/data/platform'
import { Capabilities } from './Capabilities'
import { Ecosystem } from './Ecosystem'

export const PlatformPage = () => (
    <Page>
        <PageHero
            label={platformHero.label}
            title={platformHero.title}
            description={platformHero.description}
            // Figma: 788px wide on tablet (three lines), 970px on desktop (two).
            descriptionClassName="mt-4 max-w-235 md:max-w-197 xl:max-w-[970px]"
        />
        <Capabilities />
        <Ecosystem />
        <CtaBanner />
    </Page>
)
