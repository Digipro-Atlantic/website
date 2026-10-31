import { useState, type FormEvent } from 'react'
import { site } from '@/data/site'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const isFormspreeConfigured = () =>
    !site.subscribe.formspreeAction.includes('REPLACE_WITH_YOUR_FORM_ID')

export const NewsletterForm = () => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<Status>('idle')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setStatus('error')
            setError('Please enter a valid email address.')
            return
        }

        if (!isFormspreeConfigured()) {
            window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent('Newsletter subscription')}&body=${encodeURIComponent(`Please add ${email.trim()} to the Zebul newsletter.`)}`
            setStatus('success')
            return
        }

        setStatus('submitting')

        try {
            const response = await fetch(site.subscribe.formspreeAction, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    _subject: 'Newsletter subscription',
                }),
            })

            if (!response.ok) {
                throw new Error('Unable to subscribe right now.')
            }

            setStatus('success')
        } catch {
            setStatus('error')
            setError(
                `Something went wrong. Email us at ${site.contact.email} and we will add you.`,
            )
        }
    }

    return (
        <div className="flex w-full max-w-[369px] flex-col gap-6">
            <p className="text-body text-grey-700">
                {site.subscribe.description}
            </p>

            {status === 'success' ? (
                <p
                    className="text-body font-medium text-primary-400"
                    role="status"
                >
                    Thanks, you're on the list.
                </p>
            ) : (
                <form noValidate onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <label htmlFor="newsletter-email" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="newsletter-email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            aria-invalid={status === 'error'}
                            aria-describedby={
                                error ? 'newsletter-error' : undefined
                            }
                            className="h-14 w-[238px] min-w-0 rounded-md border border-border-strong bg-white px-4 text-body-sm text-grey-900 transition-colors duration-150 ease-[ease] placeholder:text-grey-400 focus:border-primary-400 aria-invalid:border-error-400"
                        />
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="h-14 flex-1 rounded-lg bg-primary-400 px-6 text-body font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-primary-600 active:scale-[0.97] disabled:cursor-wait disabled:opacity-70"
                        >
                            Subscribe
                        </button>
                    </div>
                    {error && (
                        <p
                            id="newsletter-error"
                            className="mt-2 text-body-sm text-error-400"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}
                </form>
            )}
        </div>
    )
}
