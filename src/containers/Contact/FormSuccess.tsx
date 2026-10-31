import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'

type FormSuccessProps = {
    title: string
    children: string
    className?: string
}

/** Replaces a form after sending; takes focus so screen readers announce it. */
export const FormSuccess = ({
    title,
    children,
    className = '',
}: FormSuccessProps) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        ref.current?.focus()
    }, [])

    return (
        <div
            ref={ref}
            tabIndex={-1}
            role="status"
            className={`flex flex-col items-center justify-center py-16 text-center outline-none ${className}`}
        >
            <span
                aria-hidden="true"
                className="flex size-14 items-center justify-center rounded-full bg-primary-50 text-primary-400"
            >
                <Check className="size-7" strokeWidth={2.2} />
            </span>
            <h2 className="mt-6 text-h5 font-semibold text-grey-900 md:text-h4">
                {title}
            </h2>
            <p className="mt-3 max-w-110 text-body text-grey-600">{children}</p>
        </div>
    )
}
