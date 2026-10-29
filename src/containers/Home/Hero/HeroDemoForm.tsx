import { useState, type FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import mailIcon from '@/assets/icons/mail.svg'
import { hero } from '@/data/home'

/** Email + "Book a Demo": hands the email to the demo form as a prefill. */
export const HeroDemoForm = ({ className = '' }: { className?: string }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        navigate({
            to: hero.cta.to,
            search: { email: email.trim() || undefined },
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex w-full max-w-[517px] ${className}`}
        >
            <label
                htmlFor="hero-email"
                className="flex h-12 min-w-0 flex-1 cursor-text items-center gap-2.5 rounded-l-lg border border-r-0 border-border-strong bg-white px-4 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring xl:h-14 xl:px-6"
            >
                <span className="sr-only">Email address</span>
                <img
                    src={mailIcon}
                    alt=""
                    width={24}
                    height={24}
                    className="size-5 shrink-0 xl:size-6"
                />
                <input
                    id="hero-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={hero.emailPlaceholder}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-full min-w-0 flex-1 bg-transparent text-body text-grey-900 placeholder:text-grey-700 focus-visible:outline-none xl:text-body-lg"
                />
            </label>
            <button
                type="submit"
                className="h-12 w-30 shrink-0 rounded-r-lg bg-primary-400 text-body text-white transition-colors duration-150 ease-[ease] hover:bg-primary-600 sm:w-40 xl:h-14 xl:text-body-lg"
            >
                {hero.cta.label}
            </button>
        </form>
    )
}
