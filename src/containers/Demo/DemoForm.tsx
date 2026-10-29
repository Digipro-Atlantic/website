import { useState, type FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import {
    CheckboxField,
    SelectField,
    SubmitButton,
    TextAreaField,
    TextField,
} from '@/components/Form'
import { FormSuccess } from '@/containers/Contact/FormSuccess'
import { isEmail, sendForm } from '@/containers/Contact/submit'
import { demo, partnerRole } from '@/data/demo'
import { site } from '@/data/site'

type DemoFormProps = {
    intent?: 'partner'
    /** Prefilled from the homepage hero's email field. */
    email?: string
}

type Errors = Partial<Record<'name' | 'email' | 'consent' | 'form', string>>

export const DemoForm = ({
    intent,
    email: initialEmail = '',
}: DemoFormProps) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState(initialEmail)
    const [phone, setPhone] = useState('')
    const [organisation, setOrganisation] = useState('')
    const [role, setRole] = useState<string>(
        intent === 'partner' ? partnerRole : '',
    )
    const [portfolioSize, setPortfolioSize] = useState('')
    const [location, setLocation] = useState('')
    const [preferredTime, setPreferredTime] = useState('')
    const [notes, setNotes] = useState('')
    const [consent, setConsent] = useState(false)
    const [errors, setErrors] = useState<Errors>({})
    const [sending, setSending] = useState(false)
    const [submittedName, setSubmittedName] = useState<string | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const next: Errors = {}
        if (!name.trim()) next.name = 'Please enter your full name.'
        if (!isEmail(email)) next.email = 'Please enter a valid work email.'
        if (!consent)
            next.consent = 'Please agree to be contacted about this request.'
        setErrors(next)
        if (Object.keys(next).length > 0) return

        setSending(true)
        try {
            await sendForm({
                subject: `${demo.emailSubjectPrefix}: ${organisation || name}`,
                fields: {
                    Name: name,
                    'Work email': email,
                    Phone: phone,
                    Organisation: organisation,
                    Role: role,
                    'Properties or units': portfolioSize,
                    'State or city': location,
                    'Best time to talk': preferredTime,
                    Notes: notes,
                },
            })
            setSubmittedName(name.trim().split(/\s+/)[0] || 'there')
        } catch {
            setErrors({
                form: `Something went wrong. Email us at ${site.contact.email} and we will help.`,
            })
        } finally {
            setSending(false)
        }
    }

    if (submittedName) {
        return (
            <FormSuccess title={`${demo.successTitle}, ${submittedName}.`}>
                {`${demo.successBody} ${demo.successFallback}`}
            </FormSuccess>
        )
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h2 className="text-h5 font-semibold text-grey-900 md:text-h6 xl:text-h4">
                {demo.formTitle}
            </h2>

            <div className="mt-6 flex flex-col gap-4 xl:mt-7">
                <TextField
                    label="Full name *"
                    name="name"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={setName}
                    error={errors.name}
                />
                <TextField
                    label="Work email *"
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
                    label="Organisation"
                    name="organisation"
                    autoComplete="organization"
                    value={organisation}
                    onChange={setOrganisation}
                />
                <SelectField
                    label="I am a"
                    name="role"
                    options={demo.roles}
                    value={role}
                    onChange={setRole}
                />
                <SelectField
                    label="Properties or units"
                    name="portfolio_size"
                    options={demo.portfolioSizes}
                    value={portfolioSize}
                    onChange={setPortfolioSize}
                />
                <TextField
                    label="State or city (e.g. Lagos)"
                    name="location"
                    value={location}
                    onChange={setLocation}
                />
                <SelectField
                    label="Best time to talk"
                    name="preferred_time"
                    options={demo.preferredTimes}
                    value={preferredTime}
                    onChange={setPreferredTime}
                />
                <TextAreaField
                    label="Anything we should know?"
                    name="notes"
                    hint={demo.notesPlaceholder}
                    value={notes}
                    onChange={setNotes}
                />
            </div>

            <CheckboxField
                className="mt-4"
                name="consent"
                required
                checked={consent}
                onChange={setConsent}
                error={errors.consent}
            >
                {demo.consentPrefix}{' '}
                <Link
                    to="/privacy"
                    className="text-primary-400 underline underline-offset-2"
                >
                    Privacy Policy
                </Link>
                .
            </CheckboxField>

            {errors.form && (
                <p role="alert" className="mt-4 text-body-sm text-error-500">
                    {errors.form}
                </p>
            )}

            <SubmitButton className="mt-8" pending={sending}>
                {sending ? 'Sending…' : demo.submitLabel}
            </SubmitButton>
            <p className="mt-4 text-center text-body-sm text-grey-600 sm:text-body">
                {demo.fineprint}
            </p>
        </form>
    )
}
