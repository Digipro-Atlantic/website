import { Container } from '@/components/Container'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import { demo } from '@/data/demo'
import { BookingFlow } from './BookingFlow'

type DemoPageProps = {
    intent?: 'partner'
    email?: string
}

// Figma drops the CTA banner here: the booking card is the page's call to action.
export const DemoPage = ({ intent, email }: DemoPageProps) => (
    <Page>
        <PageHero
            label={demo.eyebrow}
            title={demo.title}
            description={demo.lead}
            descriptionClassName="mt-4 md:max-w-[836px]"
        />

        <Container className="mt-10 mb-24 md:mt-16 xl:mt-24 xl:mb-36">
            <BookingFlow intent={intent} email={email} />
        </Container>
    </Page>
)
