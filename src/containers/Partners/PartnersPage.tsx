import { Container } from '@/components/Container'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import { partners } from '@/data/partners'
import { LendingSection } from './LendingSection'
import { PartnerCards } from './PartnerCards'
import { PartnerEnquiry } from './PartnerEnquiry'

export const PartnersPage = () => (
    <Page>
        <PageHero
            label={partners.hero.label}
            title={partners.hero.title}
            description={partners.hero.description}
            titleClassName="max-w-none"
            descriptionClassName="mt-4 md:max-w-180 xl:max-w-[810px]"
        />

        <Container className="mt-12 md:mt-18 xl:mt-24">
            <PartnerCards />
        </Container>

        <LendingSection />
        <PartnerEnquiry />
    </Page>
)
