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

/** "More ways to reach us": inside the main card from tablet up, its own card on phones. */
const ReachUs = () => {
    const { info } = contact
    return (
        <>
            <h2 className="text-h5 font-semibold text-grey-900 md:text-h6 xl:text-h4">
                {contact.infoTitle}
            </h2>
            <div className="mt-8 flex flex-col gap-6 md:mt-4 xl:mt-6 xl:gap-8">
                <InfoGroup title={info.correspondence.title}>
                    <InfoText>{info.correspondence.address}</InfoText>
                </InfoGroup>
                <InfoGroup title={info.phone.title}>
                    <a href={info.phone.href} className={infoLinkClass}>
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
        </>
    )
}

export const ContactPage = () => (
    <Page>
        <PageHero
            label={contact.hero.label}
            title={contact.hero.title}
            description={contact.hero.description}
            descriptionClassName="mt-4 max-w-[378px] sm:max-w-235"
        />

        <Container className="mt-17 md:mt-18 xl:mt-24">
            <FormCard innerClassName="grid md:grid-cols-[52%_1px_1fr] xl:grid-cols-[683px_1px_1fr]">
                <div className="px-4 pt-6 pb-8 sm:px-8 md:pt-11 xl:pt-15.5 xl:pr-14 xl:pb-17 xl:pl-11">
                    <ContactForm />
                </div>

                <div
                    aria-hidden="true"
                    className="hidden bg-grey-200 md:my-10 md:block xl:my-0"
                />

                {/* Figma splits these into a second card on phones (below). */}
                <div className="hidden md:block md:pt-11 md:pr-8 md:pb-8 md:pl-10 xl:pt-15.5 xl:pr-11 xl:pb-17 xl:pl-14">
                    <ReachUs />
                </div>
            </FormCard>

            <FormCard
                className="mt-4 md:hidden"
                innerClassName="px-4 pt-6 pb-8 sm:px-8"
            >
                <ReachUs />
            </FormCard>
        </Container>

        <CtaBanner />
    </Page>
)
