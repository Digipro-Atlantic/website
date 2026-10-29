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
        />

        <Container className="mt-11 md:mt-17 xl:mt-23">
            <PartnerCards />
        </Container>

        <LendingSection />
        <PartnerEnquiry />
    </Page>
)
