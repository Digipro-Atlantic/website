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
            // Figma breaks the title as 3 lines on mobile and 2 on tablet/desktop,
            // with 24px gaps on phones and desktop (16px on tablet).
            titleClassName="mt-6 max-w-85 md:mt-4 md:max-w-none xl:mt-6 xl:max-w-230"
            descriptionClassName="mt-6 max-w-98 md:mt-4 md:max-w-none xl:mt-6 xl:max-w-[946px]"
        />
        <FaqContents />
        <FaqSections />
        <FaqHelp />
        <CtaBanner />
    </Page>
)
