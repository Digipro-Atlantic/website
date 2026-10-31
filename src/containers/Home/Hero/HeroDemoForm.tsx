import { useState, type FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import mailIcon from '@/assets/icons/mail.svg'
import { hero } from '@/data/home'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Email + "Book a Demo": only a valid email moves on, and it prefills the demo form. */
export const HeroDemoForm = ({ className = '' }: { className?: string }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const value = email.trim()

        if (!value) {
            setError('Enter your email to book a demo.')
            return
        }
        if (!EMAIL_PATTERN.test(value)) {
            setError('Enter a valid email address, like name@company.com.')
            return
        }

        navigate({ to: hero.cta.to, search: { email: value } })
    }

    return (
        <form
            noValidate
            onSubmit={handleSubmit}
            className={`w-full max-w-[517px] ${className}`}
        >
            <div className="flex">
                <label
                    htmlFor="hero-email"
                    className={`flex h-12 min-w-0 flex-1 cursor-text items-center gap-2.5 rounded-l-lg border border-r-0 bg-white px-6 transition-colors duration-150 ease-[ease] xl:h-14 ${
                        error
                            ? 'border-error-400'
                            : 'border-border-strong focus-within:border-primary-400'
                    }`}
                >
                    <span className="sr-only">Email address</span>
                    <img
                        src={mailIcon}
                        alt=""
                        width={24}
                        height={24}
                        className="size-6 shrink-0"
                    />
                    <input
                        id="hero-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder={hero.emailPlaceholder}
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                            if (error) setError(null)
                        }}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={
                            error ? 'hero-email-error' : undefined
                        }
                        className="h-full min-w-0 flex-1 bg-transparent text-body-sm text-grey-900 outline-none placeholder:text-grey-700 sm:text-body xl:text-body-lg"
                    />
                </label>
                <button
                    type="submit"
                    className="h-12 w-30 shrink-0 cursor-pointer rounded-r-lg bg-primary-400 text-body-sm text-white transition-colors duration-150 ease-[ease] hover:bg-primary-600 sm:w-40 sm:text-body xl:h-14 xl:text-body-lg"
                >
                    {hero.cta.label}
                </button>
            </div>
            {error && (
                <p
                    id="hero-email-error"
                    role="alert"
                    className="mt-2 text-body-sm text-error-400"
                >
                    {error}
                </p>
            )}
        </form>
    )
}
