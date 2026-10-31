import {
    useEffect,
    useId,
    useRef,
    useState,
    type FormEvent,
    type ReactNode,
} from 'react'
import { Link } from '@tanstack/react-router'
import { Check, ChevronDown, CircleCheck } from 'lucide-react'
import { FormCard } from '@/components/Form'
import { Logo } from '@/components/Logo'
import {
    isEmail,
    isFormspreeConfigured,
    sendForm,
} from '@/containers/Contact/submit'
import { demo, partnerRole } from '@/data/demo'
import { formatTime, longDate, slotInstant } from './schedule'
import { SlotPicker, type SlotSelection } from './SlotPicker'

type Step = 'email' | 'details' | 'schedule' | 'done'

type Details = {
    phone: string
    organisation: string
    units: string
    name: string
    role: string
    location: string
}

type BookingFlowProps = {
    intent?: 'partner'
    /** Prefilled from the homepage hero's email field; skips the email step. */
    email?: string
}

const { details: detailsCopy, team, confirmation } = demo

// Each step's panel rises 4px into place as it replaces the last.
const stepIn =
    'transition-[opacity,translate] duration-250 ease-out starting:translate-y-1 starting:opacity-0 motion-reduce:starting:translate-y-0'

const fieldClass =
    'h-12 w-full rounded-lg border border-grey-200 bg-white px-6 text-body text-grey-900 transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-grey-500 hover:border-grey-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/15 focus:outline-none aria-invalid:border-error-400'

/** "d**********n@gmail.com": first and last letter of the name part only. */
const maskEmail = (value: string) => {
    const [local, domain] = value.split('@')
    if (!domain || local.length < 3) return value
    return `${local[0]}${'*'.repeat(local.length - 2)}${local.at(-1)}@${domain}`
}

/** Figma's labelled field: 16px label 8px above a 48px input. */
const Field = ({
    label,
    error,
    children,
}: {
    label: string
    error?: string
    children: (props: {
        id: string
        'aria-invalid'?: true
        'aria-describedby'?: string
    }) => ReactNode
}) => {
    const id = useId()
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-body font-medium text-grey-900"
            >
                {label}
            </label>
            {children({
                id,
                'aria-invalid': error ? true : undefined,
                'aria-describedby': error ? `${id}-error` : undefined,
            })}
            {error && (
                <p
                    id={`${id}-error`}
                    className="mt-1.5 text-body-sm text-error-500"
                >
                    {error}
                </p>
            )}
        </div>
    )
}

const PrimaryButton = ({ children }: { children: ReactNode }) => (
    <button
        type="submit"
        className="h-12 w-full cursor-pointer rounded-lg bg-primary-400 text-body text-white transition-[background-color,transform] duration-150 ease-out hover:bg-primary-600 active:scale-[0.97]"
    >
        {children}
    </button>
)

const TeamBadge = ({ large = false }: { large?: boolean }) => (
    <div
        className={`flex ${large ? 'flex-col items-center gap-6 text-center' : 'items-center gap-4'}`}
    >
        <span
            className={`flex shrink-0 items-center justify-center rounded-full border border-grey-200 bg-white ${large ? 'size-36 xl:size-45' : 'size-14 xl:size-20'}`}
        >
            <Logo to={false} className={large ? 'h-9 xl:h-12' : 'h-4 xl:h-5'} />
        </span>
        <span>
            <span className="block text-body-lg font-semibold text-grey-900 xl:text-h6">
                {team.name}
            </span>
            <span className="mt-1 block text-body-sm text-grey-600 xl:text-body">
                {team.role}
            </span>
        </span>
    </div>
)

/**
 * The five Figma states of Book a Demo: email, more details, choose a time,
 * (time chosen), and the confirmation. The calendar stays greyed out until
 * the details are in. Nothing is booked live: Continue sends the request
 * with the chosen slot and the team confirms by email.
 */
export const BookingFlow = ({
    intent,
    email: initialEmail = '',
}: BookingFlowProps) => {
    const startsWithEmail = isEmail(initialEmail)
    const [step, setStep] = useState<Step>(
        startsWithEmail ? 'details' : 'email',
    )
    const [email, setEmail] = useState(initialEmail)
    const [emailError, setEmailError] = useState<string>()
    const [details, setDetails] = useState<Details>({
        phone: '',
        organisation: '',
        units: '',
        name: '',
        role: intent === 'partner' ? partnerRole : '',
        location: '',
    })
    const [detailErrors, setDetailErrors] = useState<
        Partial<Record<keyof Details, string>>
    >({})
    const [pending, setPending] = useState(false)
    const [sendError, setSendError] = useState<string>()
    const [booked, setBooked] = useState<SlotSelection | null>(null)
    const [viaMailto, setViaMailto] = useState(false)

    // Move focus to each new step's heading so keyboard and screen-reader users follow along.
    const headingRef = useRef<HTMLHeadingElement>(null)
    const firstRender = useRef(true)
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        headingRef.current?.focus()
    }, [step])

    // The first empty field of the current step (or its first field), scrolled into view and focused.
    const leftRef = useRef<HTMLDivElement>(null)
    const focusPendingField = () => {
        const fields = [
            ...(leftRef.current?.querySelectorAll<
                HTMLInputElement | HTMLSelectElement
            >('input, select') ?? []),
        ]
        const target = fields.find((field) => !field.value) ?? fields[0]
        target?.focus({ preventScroll: true })
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    const set = (key: keyof Details) => (value: string) =>
        setDetails((current) => ({ ...current, [key]: value }))

    const submitEmail = (event: FormEvent) => {
        event.preventDefault()
        if (!isEmail(email)) {
            setEmailError('Enter a valid email address, like name@company.com.')
            return
        }
        setEmailError(undefined)
        setStep('details')
    }

    const submitDetails = (event: FormEvent) => {
        event.preventDefault()
        const next: typeof detailErrors = {}
        if (!details.name.trim()) next.name = 'Please enter your name.'
        if (details.phone.replace(/\D/g, '').length < 7)
            next.phone = 'Please enter a phone number we can reach you on.'
        setDetailErrors(next)
        if (Object.keys(next).length === 0) setStep('schedule')
    }

    const requestSlot = async (selection: SlotSelection) => {
        const instant = slotInstant(selection.day, selection.minutes)
        const wat = longDate(instant, 'Africa/Lagos')
        setPending(true)
        setSendError(undefined)
        try {
            await sendForm({
                subject: `${demo.emailSubjectPrefix}: ${details.organisation || details.name}`,
                fields: {
                    Email: email,
                    Name: details.name,
                    Phone: details.phone,
                    'Company or community': details.organisation,
                    'Properties or units': details.units,
                    Role: details.role,
                    'State or city': details.location,
                    'Requested time (WAT)': `${wat.weekday}, ${wat.date}, ${formatTime(instant, 'Africa/Lagos')}`,
                    'Visitor time zone': `${selection.zone.name} (${selection.zone.id})`,
                    'Other attendees': selection.attendees.join(', '),
                },
            })
            setViaMailto(!isFormspreeConfigured())
            setBooked(selection)
            setStep('done')
        } catch {
            setSendError(
                'We could not send that just now. Please try again in a moment.',
            )
        } finally {
            setPending(false)
        }
    }

    const heading = (text: string, className = '') => (
        <h2
            ref={headingRef}
            tabIndex={-1}
            className={`font-semibold text-grey-900 outline-none ${className}`}
        >
            {text}
        </h2>
    )

    if (step === 'done' && booked) {
        const instant = slotInstant(booked.day, booked.minutes)
        const when = longDate(instant, booked.zone.id)
        return (
            <FormCard
                className="shadow-[0_1.5px_4px_-1px_rgb(16_25_40/0.07)]"
                innerClassName="grid gap-10 p-6 md:grid-cols-[minmax(0,40%)_1fr] md:gap-0 md:p-8 xl:grid-cols-[483px_1fr] xl:p-12"
            >
                <div
                    className={`flex items-center justify-center py-4 md:border-r md:border-grey-300 md:py-16 ${stepIn}`}
                >
                    <TeamBadge large />
                </div>
                <div
                    role="status"
                    className={`md:pl-8 xl:px-16 xl:py-8 ${stepIn}`}
                >
                    {heading(confirmation.title, 'text-body-lg')}
                    <dl className="mt-10 grid grid-cols-2 gap-x-6">
                        <div>
                            <dt className="text-body-sm text-grey-900">
                                {confirmation.time}
                            </dt>
                            <dd className="mt-1 text-body-lg font-medium text-grey-900">
                                {formatTime(instant, booked.zone.id)}
                                <br />
                                {booked.zone.name.replace(/^./, (c) =>
                                    c.toUpperCase(),
                                )}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-body-sm text-grey-900">
                                {confirmation.date}
                            </dt>
                            <dd className="mt-1 text-body-lg font-medium text-grey-900">
                                {when.weekday}
                                <br />
                                {when.date}
                            </dd>
                        </div>
                    </dl>
                    <div className="mt-11 max-w-146 rounded border border-grey-300 bg-grey-50 p-6 xl:p-10">
                        <CircleCheck
                            aria-hidden="true"
                            className="size-6 text-success-500"
                            strokeWidth={1.5}
                        />
                        <p className="mt-2 text-body-sm text-grey-600">
                            {viaMailto
                                ? confirmation.mailtoFallback
                                : confirmation.sent}
                        </p>
                        <p className="mt-2 text-body-lg font-semibold break-all text-grey-900">
                            {email}
                        </p>
                    </div>
                </div>
            </FormCard>
        )
    }

    return (
        <FormCard
            className="shadow-[0_1.5px_4px_-1px_rgb(16_25_40/0.07)]"
            innerClassName="grid gap-12 p-6 md:grid-cols-[minmax(0,40%)_1fr] md:gap-0 md:p-8 xl:grid-cols-[483px_1fr] xl:p-12"
        >
            <div
                ref={leftRef}
                className="md:border-r md:border-grey-300 md:pr-6 xl:p-8"
            >
                {step === 'email' && (
                    <form
                        noValidate
                        onSubmit={submitEmail}
                        className={`max-w-94 ${stepIn}`}
                    >
                        {heading(demo.email.title, 'text-h4')}
                        <p className="mt-4 text-body text-black">
                            {demo.email.lead}
                        </p>
                        <div className="mt-6">
                            <Field label={demo.email.label} error={emailError}>
                                {(props) => (
                                    <input
                                        {...props}
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        placeholder={demo.email.placeholder}
                                        className={fieldClass}
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="mt-6">
                            <PrimaryButton>{demo.email.action}</PrimaryButton>
                        </div>
                        <p className="mt-4 text-center text-body-sm text-grey-600">
                            {demo.email.privacyPrefix}{' '}
                            <Link
                                to="/privacy"
                                className="text-primary-400 underline underline-offset-2 hover:text-primary-600"
                            >
                                Privacy Policy
                            </Link>
                            <span className="text-primary-400">.</span>
                        </p>
                    </form>
                )}

                {step === 'details' && (
                    <form
                        noValidate
                        onSubmit={submitDetails}
                        className={`max-w-94 ${stepIn}`}
                    >
                        {heading(detailsCopy.title, 'text-h4')}
                        <div className="mt-10 flex flex-col gap-4">
                            <Field
                                label={detailsCopy.fields.phone}
                                error={detailErrors.phone}
                            >
                                {(props) => (
                                    <input
                                        {...props}
                                        type="tel"
                                        autoComplete="tel"
                                        value={details.phone}
                                        onChange={(event) =>
                                            set('phone')(event.target.value)
                                        }
                                        className={fieldClass}
                                    />
                                )}
                            </Field>
                            <Field label={detailsCopy.fields.organisation}>
                                {(props) => (
                                    <input
                                        {...props}
                                        type="text"
                                        autoComplete="organization"
                                        value={details.organisation}
                                        onChange={(event) =>
                                            set('organisation')(
                                                event.target.value,
                                            )
                                        }
                                        className={fieldClass}
                                    />
                                )}
                            </Field>
                            <Field label={detailsCopy.fields.units}>
                                {(props) => (
                                    <input
                                        {...props}
                                        type="number"
                                        min={1}
                                        inputMode="numeric"
                                        value={details.units}
                                        onChange={(event) =>
                                            set('units')(event.target.value)
                                        }
                                        className={fieldClass}
                                    />
                                )}
                            </Field>
                            <Field
                                label={detailsCopy.fields.name}
                                error={detailErrors.name}
                            >
                                {(props) => (
                                    <input
                                        {...props}
                                        type="text"
                                        autoComplete="name"
                                        value={details.name}
                                        onChange={(event) =>
                                            set('name')(event.target.value)
                                        }
                                        className={fieldClass}
                                    />
                                )}
                            </Field>
                            <Field label={detailsCopy.fields.role}>
                                {(props) => (
                                    <div className="relative">
                                        <select
                                            {...props}
                                            value={details.role}
                                            onChange={(event) =>
                                                set('role')(event.target.value)
                                            }
                                            className={`${fieldClass} cursor-pointer appearance-none pr-12 ${details.role ? '' : 'text-grey-500'}`}
                                        >
                                            <option value="" disabled>
                                                {detailsCopy.rolePlaceholder}
                                            </option>
                                            {demo.roles.map((role) => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown
                                            aria-hidden="true"
                                            className="pointer-events-none absolute top-1/2 right-6 size-4 -translate-y-1/2 text-grey-900"
                                        />
                                    </div>
                                )}
                            </Field>
                            <Field label={detailsCopy.fields.location}>
                                {(props) => (
                                    <input
                                        {...props}
                                        type="text"
                                        autoComplete="address-level1"
                                        value={details.location}
                                        onChange={(event) =>
                                            set('location')(event.target.value)
                                        }
                                        className={fieldClass}
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="mt-6">
                            <PrimaryButton>{detailsCopy.action}</PrimaryButton>
                        </div>
                        <p className="mt-4 text-body-sm text-grey-600">
                            {detailsCopy.sentTo} {maskEmail(email)}.{' '}
                            <button
                                type="button"
                                onClick={() => setStep('email')}
                                className="cursor-pointer text-primary-400 underline underline-offset-2 hover:text-primary-600"
                            >
                                {detailsCopy.notYou}
                            </button>
                        </p>
                    </form>
                )}

                {step === 'schedule' && (
                    <div className={stepIn}>
                        <TeamBadge />
                        {heading(
                            team.title,
                            'mt-7.5 max-w-80 text-h6 xl:max-w-88 xl:text-h5',
                        )}
                        <ul className="mt-4 flex flex-col gap-2">
                            {team.points.map((point) => (
                                <li
                                    key={point.lead}
                                    className="flex items-start gap-2 text-body-sm text-grey-600 xl:text-body"
                                >
                                    <Check
                                        aria-hidden="true"
                                        className="size-5 shrink-0 text-primary-400 xl:size-6"
                                        strokeWidth={2}
                                    />
                                    <span>
                                        <span className="font-semibold">
                                            {point.lead}
                                        </span>
                                        {point.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-body text-grey-900 xl:text-body-lg">
                            {team.prompt}
                        </p>
                    </div>
                )}
            </div>

            <div className="md:pl-8 xl:py-8 xl:pl-16">
                <div className="relative max-w-146">
                    <SlotPicker
                        enabled={step === 'schedule'}
                        pending={pending}
                        error={sendError}
                        onContinue={requestSlot}
                    />
                    {/* While locked, the calendar explains itself: any click on it
                        sends the visitor to the field they still need to fill. */}
                    {step !== 'schedule' && (
                        <button
                            type="button"
                            onClick={focusPendingField}
                            className="group absolute inset-0 flex cursor-pointer items-center justify-center"
                        >
                            <span className="rounded-full border border-grey-200 bg-white px-4 py-2 text-body-sm font-medium text-grey-900 shadow-[0_4px_12px_-2px_rgb(16_25_40/0.12)] transition-[border-color,translate] duration-150 ease-out group-hover:border-primary-400 group-active:translate-y-px">
                                {step === 'email'
                                    ? demo.schedule.lockedEmail
                                    : demo.schedule.lockedDetails}
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </FormCard>
    )
}
