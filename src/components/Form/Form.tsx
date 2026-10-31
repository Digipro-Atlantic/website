import { useId, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

/*
 * Form primitives for the Contact, Partners and Demo pages.
 * Figma fields are placeholder-labelled, so the visible label is the
 * placeholder and a screen-reader label carries the same text.
 * Field: 64px tall, 8px corners, #E4E7EC stroke, 24px inset, 16px text (14px on mobile).
 * Tablet: Figma shrinks these to ~70%; we stop at 48px fields and 14px text.
 */

const fieldClass =
    'w-full rounded-lg border border-grey-200 bg-white px-6 text-body-sm text-grey-900 transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-grey-600 hover:border-grey-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/15 focus:outline-none aria-invalid:border-error-400 sm:text-body md:text-body-sm xl:text-body'

type BaseFieldProps = {
    label: string
    name: string
    required?: boolean
    error?: string
    className?: string
}

const FieldError = ({ id, error }: { id: string; error?: string }) =>
    error ? (
        <p id={id} className="mt-1.5 text-body-sm text-error-500">
            {error}
        </p>
    ) : null

type TextFieldProps = BaseFieldProps & {
    type?: 'text' | 'email' | 'tel'
    value: string
    onChange: (value: string) => void
    autoComplete?: string
}

export const TextField = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    required,
    error,
    autoComplete,
    className = '',
}: TextFieldProps) => {
    const id = useId()

    return (
        <div className={className}>
            <label htmlFor={id} className="sr-only">
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={label}
                required={required}
                autoComplete={autoComplete}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`${fieldClass} h-16 md:h-12 xl:h-16`}
            />
            <FieldError id={`${id}-error`} error={error} />
        </div>
    )
}

type TextAreaFieldProps = BaseFieldProps & {
    value: string
    onChange: (value: string) => void
    maxLength?: number
    hint?: string
}

export const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    required,
    error,
    maxLength,
    hint,
    className = '',
}: TextAreaFieldProps) => {
    const id = useId()
    const describedBy =
        [hint && `${id}-hint`, error && `${id}-error`]
            .filter(Boolean)
            .join(' ') || undefined

    return (
        <div className={className}>
            <label htmlFor={id} className="sr-only">
                {label}
            </label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={label}
                required={required}
                maxLength={maxLength}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
                className={`${fieldClass} block h-45 resize-y py-5 md:h-30 md:py-3.5 xl:h-42 xl:py-5`}
            />
            {hint && (
                <p
                    id={`${id}-hint`}
                    className="mt-2 text-body-sm text-grey-600 sm:text-body md:text-body-sm xl:text-body"
                >
                    {hint}
                </p>
            )}
            <FieldError id={`${id}-error`} error={error} />
        </div>
    )
}

type SelectFieldProps = BaseFieldProps & {
    value: string
    onChange: (value: string) => void
    options: readonly string[]
}

export const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
    required,
    error,
    className = '',
}: SelectFieldProps) => {
    const id = useId()

    return (
        <div className={className}>
            <label htmlFor={id} className="sr-only">
                {label}
            </label>
            <div className="relative">
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    required={required}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className={`${fieldClass} h-16 cursor-pointer appearance-none pr-14 md:h-12 xl:h-16 ${value ? '' : 'text-grey-600'}`}
                >
                    <option value="" disabled>
                        {label}
                    </option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-6 size-6 -translate-y-1/2 text-grey-900"
                    strokeWidth={1.5}
                />
            </div>
            <FieldError id={`${id}-error`} error={error} />
        </div>
    )
}

type CheckboxFieldProps = {
    name: string
    checked: boolean
    onChange: (checked: boolean) => void
    children: ReactNode
    required?: boolean
    error?: string
    className?: string
}

export const CheckboxField = ({
    name,
    checked,
    onChange,
    children,
    required,
    error,
    className = '',
}: CheckboxFieldProps) => {
    const id = useId()

    return (
        <div className={className}>
            <div className="flex items-start gap-2">
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => onChange(event.target.checked)}
                    required={required}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className="mt-0.5 size-5.5 shrink-0 cursor-pointer appearance-none rounded-md border border-grey-300 bg-white bg-center bg-no-repeat transition-colors duration-150 ease-out checked:border-primary-400 checked:bg-primary-400 checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22><path d=%22M3.5 8.5l3 3 6-7%22 stroke=%22white%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] aria-invalid:border-error-400"
                />
                <label
                    htmlFor={id}
                    className="cursor-pointer text-body-sm text-grey-600 sm:text-body md:text-body-sm xl:text-body"
                >
                    {children}
                </label>
            </div>
            <FieldError id={`${id}-error`} error={error} />
        </div>
    )
}

type SubmitButtonProps = {
    children: ReactNode
    pending?: boolean
    className?: string
}

/** Full-width primary submit — Figma 64px, #005B4C, 8px corners. */
export const SubmitButton = ({
    children,
    pending = false,
    className = '',
}: SubmitButtonProps) => (
    <button
        type="submit"
        disabled={pending}
        aria-busy={pending || undefined}
        className={`inline-flex h-14 w-full items-center justify-center rounded-lg bg-primary-400 text-body text-white transition-[background-color,transform] duration-150 ease-out hover:bg-primary-600 active:scale-[0.99] disabled:cursor-progress disabled:opacity-70 sm:h-16 ${className}`}
    >
        {children}
    </button>
)

type FormCardProps = {
    children: ReactNode
    className?: string
    innerClassName?: string
}

/** Figma's double-edged panel: #F9FAFB mat with an 8px inset white card and #E4E7EC hairline. */
export const FormCard = ({
    children,
    className = '',
    innerClassName = '',
}: FormCardProps) => (
    <div className={`rounded-2xl bg-grey-50 p-2 ${className}`}>
        <div
            className={`rounded-2xl border border-grey-200 bg-white ${innerClassName}`}
        >
            {children}
        </div>
    </div>
)
