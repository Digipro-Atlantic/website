import { Container } from '@/components/Container'
import { CtaBanner } from '@/components/CtaBanner'
import { FormCard } from '@/components/Form'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import { contact } from '@/data/contact'
import { ContactForm } from './ContactForm'
import {
    InfoArrowLink,
    InfoGroup,
    InfoMailto,
    InfoText,
    infoLinkClass,
} from './ContactInfo'

export const ContactPage = () => {
    const { info } = contact

    return (
        <Page>
            <PageHero
                label={contact.hero.label}
                title={contact.hero.title}
                description={contact.hero.description}
            />

            <Container className="mt-11 md:mt-17 xl:mt-30">
                <FormCard innerClassName="grid md:grid-cols-[52%_1px_1fr] xl:grid-cols-[683px_1px_1fr]">
                    <div className="px-4 py-8 sm:px-8 xl:py-17 xl:pr-14 xl:pl-11">
                        <ContactForm />
                    </div>

                    <div
                        aria-hidden="true"
                        className="hidden bg-grey-200 md:my-10 md:block xl:my-0"
                    />

                    <div className="border-t border-grey-200 px-4 py-8 sm:px-8 md:border-t-0 md:pl-10 xl:py-17 xl:pr-11 xl:pl-14">
                        <h2 className="text-h5 font-semibold text-grey-900 md:text-h6 xl:text-h4">
                            {contact.infoTitle}
                        </h2>
                        <div className="mt-6 flex flex-col gap-8 xl:mt-7">
                            <InfoGroup title={info.correspondence.title}>
                                <InfoText>
                                    {info.correspondence.address}
                                </InfoText>
                            </InfoGroup>
                            <InfoGroup title={info.phone.title}>
                                <a
                                    href={info.phone.href}
                                    className={infoLinkClass}
                                >
                                    {info.phone.display}
                                </a>
                            </InfoGroup>
                            <InfoGroup title={info.email.title}>
                                {info.email.addresses.map((address) => (
                                    <InfoMailto key={address} email={address} />
                                ))}
                            </InfoGroup>
                            <InfoGroup title={info.faq.title}>
                                <InfoArrowLink {...info.faq.link} />
                            </InfoGroup>
                            <InfoGroup title={info.sales.title}>
                                <InfoArrowLink {...info.sales.link} />
                            </InfoGroup>
                        </div>
                    </div>
                </FormCard>
            </Container>

            <CtaBanner />
        </Page>
    )
}
