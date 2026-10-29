import { useState, type FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import {
    CheckboxField,
    SelectField,
    SubmitButton,
    TextAreaField,
    TextField,
} from '@/components/Form'
import { contact } from '@/data/contact'
import { site } from '@/data/site'
import { FormSuccess } from './FormSuccess'
import { isEmail, sendForm } from './submit'

type Errors = Partial<
    Record<
        'name' | 'email' | 'subject' | 'message' | 'privacy' | 'form',
        string
    >
>

export const ContactForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [organisation, setOrganisation] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [privacy, setPrivacy] = useState(false)
    const [newsletter, setNewsletter] = useState(false)
    const [errors, setErrors] = useState<Errors>({})
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const next: Errors = {}
        if (!name.trim()) next.name = 'Please enter your full name.'
        if (!isEmail(email)) next.email = 'Please enter a valid email address.'
        if (!subject) next.subject = 'Please choose a subject.'
        if (!message.trim()) next.message = 'Please write a message.'
        if (!privacy) next.privacy = 'Please accept the Privacy Policy.'
        setErrors(next)
        if (Object.keys(next).length > 0) return

        setSending(true)
        try {
            await sendForm({
                subject: `${contact.emailSubjectPrefix}: ${subject}`,
                fields: {
                    Name: name,
                    Email: email,
                    Telephone: phone,
                    Organisation: organisation,
                    Subject: subject,
                    Newsletter: newsletter ? 'Yes' : 'No',
                    Message: message,
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

    if (sent) {
        return (
            <FormSuccess title={contact.successTitle}>
                {contact.successBody}
            </FormSuccess>
        )
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h2 className="text-h5 font-semibold text-grey-900 md:text-h6 xl:text-h4">
                {contact.formTitle}
            </h2>

            <div className="mt-6 flex flex-col gap-4 xl:mt-7">
                <TextField
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={setName}
                    error={errors.name}
                />
                <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={setEmail}
                    error={errors.email}
                />
                <TextField
                    label="Telephone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={setPhone}
                />
                <TextField
                    label="Organization"
                    name="organisation"
                    autoComplete="organization"
                    value={organisation}
                    onChange={setOrganisation}
                />
                <SelectField
                    label="Select Subject"
                    name="subject"
                    options={contact.subjects}
                    value={subject}
                    onChange={setSubject}
                    error={errors.subject}
                />
                <TextAreaField
                    label="Message"
                    name="message"
                    maxLength={contact.messageMax}
                    hint={contact.messageHint}
                    value={message}
                    onChange={setMessage}
                    error={errors.message}
                />
            </div>

            <div className="mt-4 flex flex-col gap-3">
                <CheckboxField
                    name="privacy"
                    checked={privacy}
                    onChange={setPrivacy}
                    error={errors.privacy}
                >
                    I have read and I accept the{' '}
                    <Link
                        to="/privacy"
                        className="text-primary-400 underline underline-offset-2"
                    >
                        Privacy Policy
                    </Link>
                    .
                </CheckboxField>
                <CheckboxField
                    name="newsletter"
                    checked={newsletter}
                    onChange={setNewsletter}
                >
                    {contact.newsletterLabel}
                </CheckboxField>
            </div>

            {errors.form && (
                <p role="alert" className="mt-4 text-body-sm text-error-500">
                    {errors.form}
                </p>
            )}

            <SubmitButton className="mt-8" pending={sending}>
                {sending ? 'Sending…' : contact.submitLabel}
            </SubmitButton>
        </form>
    )
}
