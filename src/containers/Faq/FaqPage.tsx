import { CtaBanner } from '@/components/CtaBanner'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import { faqIntro } from '@/data/faq'
import { FaqContents } from './FaqContents'
import { FaqHelp } from './FaqHelp'
import { FaqSections } from './FaqSections'

export const FaqPage = () => (
    <Page>
        <PageHero
            label={faqIntro.label}
            title={faqIntro.title}
            description={faqIntro.description}
            // Figma breaks the title as 3 lines on mobile and 2 on tablet/desktop.
            titleClassName="max-w-85 md:max-w-none xl:max-w-230"
        />
        <FaqContents />
        <FaqSections />
        <FaqHelp />
        <CtaBanner />
    </Page>
)
