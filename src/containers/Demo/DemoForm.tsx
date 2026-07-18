import { useState, type ChangeEvent, type FormEvent } from 'react'
import { demo, partnerRole } from '@/data/demo'
import { site } from '@/data/site'

type DemoFormProps = {
    intent?: 'partner'
}

type FormState = {
    name: string
    email: string
    phone: string
    organisation: string
    role: string
    portfolioSize: string
    location: string
    preferredTime: string
    notes: string
    consent: boolean
}

const initialState = (intent?: 'partner'): FormState => ({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    role: intent === 'partner' ? partnerRole : demo.roles[0],
    portfolioSize: demo.portfolioSizes[0],
    location: '',
    preferredTime: demo.preferredTimes[0],
    notes: '',
    consent: false,
})

const isFormspreeConfigured = () =>
    !site.subscribe.formspreeAction.includes('REPLACE_WITH_YOUR_FORM_ID')

export const DemoForm = ({ intent }: DemoFormProps) => {
    const [values, setValues] = useState(() => initialState(intent))
    const [submittedName, setSubmittedName] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const update =
        (field: keyof FormState) =>
        (
            event: ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >,
        ) => {
            const value =
                event.target.type === 'checkbox'
                    ? (event.target as HTMLInputElement).checked
                    : event.target.value
            setValues((prev) => ({ ...prev, [field]: value }))
        }

    const openMailto = () => {
        const subject = `${demo.emailSubjectPrefix}: ${values.organisation || values.name || 'Zebul'}`
        const body = [
            `Name: ${values.name}`,
            `Work email: ${values.email}`,
            `Phone: ${values.phone}`,
            `Organisation: ${values.organisation}`,
            `Role: ${values.role}`,
            `Properties or units: ${values.portfolioSize}`,
            `State or city: ${values.location}`,
            `Best time to talk: ${values.preferredTime}`,
            '',
            'What they shared:',
            values.notes,
        ].join('\n')

        window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)

        if (!values.name.trim()) {
            setError('Please enter your full name.')
            return
        }

        if (
            !values.email.trim() ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
        ) {
            setError('Please enter a valid work email.')
            return
        }

        if (!values.consent) {
            setError('Please agree to be contacted about this request.')
            return
        }

        setSubmitting(true)

        try {
            if (isFormspreeConfigured()) {
                const response = await fetch(site.subscribe.formspreeAction, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        phone: values.phone,
                        organisation: values.organisation,
                        role: values.role,
                        portfolio_size: values.portfolioSize,
                        location: values.location,
                        preferred_time: values.preferredTime,
                        notes: values.notes,
                        _subject: `${demo.emailSubjectPrefix}: ${values.organisation || values.name}`,
                    }),
                })

                if (!response.ok) {
                    throw new Error('Unable to send your request right now.')
                }
            } else {
                openMailto()
            }

            setSubmittedName(values.name.trim().split(/\s+/)[0] || 'there')
        } catch {
            setError(
                `Something went wrong. Email us at ${site.contact.email} and we will help.`,
            )
        } finally {
            setSubmitting(false)
        }
    }

    if (submittedName) {
        return (
            <div className="demo-success" role="status">
                <div className="demo-tick" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path
                            d="M5 13l4 4 10-11"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <h2>
                    {demo.successTitle}, {submittedName}.
                </h2>
                <p>{demo.successBody}</p>
                <p className="demo-fineprint">{demo.successFallback}</p>
            </div>
        )
    }

    return (
        <form className="demo-form" onSubmit={handleSubmit} noValidate>
            <h2>{demo.formTitle}</h2>

            <div className="demo-frow">
                <div className="demo-field">
                    <label htmlFor="demo-name">Full name *</label>
                    <input
                        id="demo-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={values.name}
                        onChange={update('name')}
                    />
                </div>
                <div className="demo-field">
                    <label htmlFor="demo-email">Work email *</label>
                    <input
                        id="demo-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={values.email}
                        onChange={update('email')}
                    />
                </div>
            </div>

            <div className="demo-frow">
                <div className="demo-field">
                    <label htmlFor="demo-phone">Phone</label>
                    <input
                        id="demo-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+234"
                        value={values.phone}
                        onChange={update('phone')}
                    />
                </div>
                <div className="demo-field">
                    <label htmlFor="demo-org">Organisation</label>
                    <input
                        id="demo-org"
                        name="organisation"
                        type="text"
                        autoComplete="organization"
                        value={values.organisation}
                        onChange={update('organisation')}
                    />
                </div>
            </div>

            <div className="demo-frow">
                <div className="demo-field">
                    <label htmlFor="demo-role">I am a</label>
                    <select
                        id="demo-role"
                        name="role"
                        value={values.role}
                        onChange={update('role')}
                    >
                        {demo.roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="demo-field">
                    <label htmlFor="demo-size">Properties or units</label>
                    <select
                        id="demo-size"
                        name="portfolio_size"
                        value={values.portfolioSize}
                        onChange={update('portfolioSize')}
                    >
                        {demo.portfolioSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="demo-frow">
                <div className="demo-field">
                    <label htmlFor="demo-location">State or city</label>
                    <input
                        id="demo-location"
                        name="location"
                        type="text"
                        placeholder="e.g. Lagos"
                        value={values.location}
                        onChange={update('location')}
                    />
                </div>
                <div className="demo-field">
                    <label htmlFor="demo-when">Best time to talk</label>
                    <select
                        id="demo-when"
                        name="preferred_time"
                        value={values.preferredTime}
                        onChange={update('preferredTime')}
                    >
                        {demo.preferredTimes.map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="demo-field">
                <label htmlFor="demo-notes">Anything we should know?</label>
                <textarea
                    id="demo-notes"
                    name="notes"
                    rows={3}
                    placeholder={demo.notesPlaceholder}
                    value={values.notes}
                    onChange={update('notes')}
                />
            </div>

            <label className="demo-consent">
                <input
                    type="checkbox"
                    name="consent"
                    required
                    checked={values.consent}
                    onChange={update('consent')}
                />
                <span>
                    {demo.consentPrefix}{' '}
                    <a
                        href="https://zebul.ng/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Privacy Policy
                    </a>
                    .
                </span>
            </label>

            {error && (
                <p className="demo-error" role="alert">
                    {error}
                </p>
            )}

            <button
                type="submit"
                className="btn btn-gold demo-submit"
                disabled={submitting}
            >
                {submitting ? 'Sending…' : demo.submitLabel}
            </button>
            <p className="demo-fineprint">{demo.fineprint}</p>
        </form>
    )
}
