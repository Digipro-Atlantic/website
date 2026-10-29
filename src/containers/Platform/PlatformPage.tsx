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
            // Figma's lead runs wider than the hero's 940px cap on desktop.
            description={
                <span className="block xl:-mx-6">
                    {platformHero.description}
                </span>
            }
        />
        <Capabilities />
        <Ecosystem />
        <CtaBanner />
    </Page>
)
