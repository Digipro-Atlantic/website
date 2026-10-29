import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

export const infoLinkClass =
    'inline-flex items-center gap-2 text-body text-grey-600 transition-colors duration-150 hover:text-primary-400'

export const InfoGroup = ({
    title,
    children,
}: {
    title: string
    children: ReactNode
}) => (
    <div>
        <h3 className="text-body font-semibold text-grey-900">{title}</h3>
        <div className="mt-3 flex flex-col gap-2 xl:mt-4 xl:gap-3">
            {children}
        </div>
    </div>
)

export const InfoText = ({ children }: { children: ReactNode }) => (
    <p className="text-body text-grey-600">{children}</p>
)

export const InfoMailto = ({ email }: { email: string }) => (
    <a href={`mailto:${email}`} className={infoLinkClass}>
        {email}
    </a>
)

export const InfoArrowLink = ({ label, to }: { label: string; to: string }) => (
    <Link to={to} className={infoLinkClass}>
        {label}
        <ArrowRight
            aria-hidden="true"
            className="size-4 text-grey-900"
            strokeWidth={2}
        />
    </Link>
)
