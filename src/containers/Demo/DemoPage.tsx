import { Container } from '@/components/Container'
import { CtaBanner } from '@/components/CtaBanner'
import { FormCard } from '@/components/Form'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import {
    InfoGroup,
    InfoMailto,
    InfoText,
} from '@/containers/Contact/ContactInfo'
import { demo } from '@/data/demo'
import { site } from '@/data/site'
import { DemoForm } from './DemoForm'

type DemoPageProps = {
    intent?: 'partner'
    email?: string
}

export const DemoPage = ({ intent, email }: DemoPageProps) => (
    <Page>
        <PageHero
            label={demo.eyebrow}
            title={demo.title}
            description={demo.lead}
        />

        <Container className="mt-11 md:mt-17 xl:mt-30">
            <FormCard innerClassName="grid md:grid-cols-[52%_1px_1fr] xl:grid-cols-[683px_1px_1fr]">
                <div className="px-4 py-8 sm:px-8 xl:py-17 xl:pr-14 xl:pl-11">
                    <DemoForm intent={intent} email={email} />
                </div>

                <div
                    aria-hidden="true"
                    className="hidden bg-grey-200 md:my-10 md:block xl:my-0"
                />

                <div className="border-t border-grey-200 px-4 py-8 sm:px-8 md:border-t-0 md:pl-10 xl:py-17 xl:pr-11 xl:pl-14">
                    <h2 className="text-h5 font-semibold text-grey-900 md:text-h6 xl:text-h4">
                        What to expect
                    </h2>
                    <ul className="mt-6 flex flex-col gap-8 xl:mt-7">
                        {demo.points.map((point) => (
                            <li key={point.title}>
                                <InfoGroup title={point.title}>
                                    <InfoText>{point.text}</InfoText>
                                </InfoGroup>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-body text-grey-600">
                        {demo.alt} <InfoMailto email={site.contact.email} />.
                    </p>
                </div>
            </FormCard>
        </Container>

        <CtaBanner />
    </Page>
)
