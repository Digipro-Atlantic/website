import { useState, type FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { Container } from '@/components/Container'
import {
    CheckboxField,
    FormCard,
    SelectField,
    SubmitButton,
    TextAreaField,
    TextField,
} from '@/components/Form'
import { FormSuccess } from '@/containers/Contact/FormSuccess'
import { isEmail, sendForm } from '@/containers/Contact/submit'
import { partners } from '@/data/partners'
import { site } from '@/data/site'
import { SectionHeading } from './SectionHeading'

const { enquiry } = partners

type Errors = Partial<
    Record<
        'organisation' | 'type' | 'contactName' | 'email' | 'consent' | 'form',
        string
    >
>

export const PartnerEnquiry = () => {
    const [organisation, setOrganisation] = useState('')
    const [type, setType] = useState('')
    const [contactName, setContactName] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [cbn, setCbn] = useState('')
    const [about, setAbout] = useState('')
    const [consent, setConsent] = useState(false)
    const [errors, setErrors] = useState<Errors>({})
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const next: Errors = {}
        if (!organisation.trim())
            next.organisation = 'Please enter your organisation.'
        if (!type) next.type = 'Please choose a partner type.'
        if (!contactName.trim())
            next.contactName = 'Please enter a contact name.'
        if (!isEmail(email)) next.email = 'Please enter a valid work email.'
        if (!consent) next.consent = 'Please agree to be contacted.'
        setErrors(next)
        if (Object.keys(next).length > 0) return

        setSending(true)
        try {
            await sendForm({
                subject: `${enquiry.emailSubjectPrefix}: ${organisation}`,
                fields: {
                    Organisation: organisation,
                    'Partner type': type,
                    'Contact name': contactName,
                    'Role or title': role,
                    'Work email': email,
                    Phone: phone,
                    'CBN licence number': cbn,
                    About: about,
                },
            })
            setSent(true)
        } catch {
            setErrors({
                form: `Something went wrong. Email us at ${site.contact.email} and we will help.`,
            })
        } finally {
            setSending(false)
        }
    }

    return (
        <Container className="mt-22 mb-24 md:mt-25 xl:mt-37 xl:mb-36">
            <SectionHeading
                label={enquiry.label}
                title={enquiry.title}
                description={enquiry.description}
            />

            <FormCard
                className="mx-auto mt-11 max-w-176 md:mt-17 xl:mt-23 xl:max-w-220"
                innerClassName="p-4 sm:p-8 xl:p-14"
            >
                {sent ? (
                    <FormSuccess title={enquiry.successTitle}>
                        {enquiry.successBody}
                    </FormSuccess>
                ) : (
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid gap-4 md:grid-cols-2 xl:gap-6">
                            <TextField
                                label="Organization*"
                                name="organisation"
                                autoComplete="organization"
                                required
                                value={organisation}
                                onChange={setOrganisation}
                                error={errors.organisation}
                            />
                            <SelectField
                                label="Partner Type*"
                                name="partner_type"
                                options={enquiry.partnerTypes}
                                required
                                value={type}
                                onChange={setType}
                                error={errors.type}
                            />
                            <TextField
                                label="Contact Name*"
                                name="contact_name"
                                autoComplete="name"
                                required
                                value={contactName}
                                onChange={setContactName}
                                error={errors.contactName}
                            />
                            <TextField
                                label="Role or Title"
                                name="role"
                                autoComplete="organization-title"
                                value={role}
                                onChange={setRole}
                            />
                            <TextField
                                label="Work Email*"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={setEmail}
                                error={errors.email}
                            />
                            <TextField
                                label="Phone"
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                value={phone}
                                onChange={setPhone}
                            />
                            <TextField
                                className="md:col-span-2"
                                label="CBN licence number (financial institutions)"
                                name="cbn_licence"
                                value={cbn}
                                onChange={setCbn}
                            />
                            <TextAreaField
                                className="md:col-span-2"
                                label="About your organisation"
                                name="about"
                                value={about}
                                onChange={setAbout}
                            />
                        </div>

                        <CheckboxField
                            className="mt-4 xl:mt-5"
                            name="consent"
                            required
                            checked={consent}
                            onChange={setConsent}
                            error={errors.consent}
                        >
                            I agree to be contacted about this enquiry, in line
                            with the{' '}
                            <Link
                                to="/privacy"
                                className="text-primary-400 underline underline-offset-2"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </CheckboxField>

                        {errors.form && (
                            <p
                                role="alert"
                                className="mt-4 text-body-sm text-error-500"
                            >
                                {errors.form}
                            </p>
                        )}

                        <SubmitButton
                            className="mt-8 xl:mt-10"
                            pending={sending}
                        >
                            {sending ? 'Sending…' : enquiry.submitLabel}
                        </SubmitButton>
                        <p className="mt-4 text-center text-body-sm text-grey-600 sm:text-body xl:mt-7">
                            {enquiry.fineprint}
                        </p>
                    </form>
                )}
            </FormCard>
        </Container>
    )
}
