import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import type { NavLink } from '@/data/types'

type SiteLinkProps = {
    link: NavLink
    className?: string
    activeClassName?: string
    onClick?: () => void
    children?: ReactNode
}

export const SiteLink = ({
    link,
    className = '',
    activeClassName = '',
    onClick,
    children,
}: SiteLinkProps) => {
    const label = children ?? link.label

    if (link.external) {
        return (
            <a
                href={link.to}
                className={className}
                onClick={onClick}
                target={link.to.startsWith('http') ? '_blank' : undefined}
                rel={
                    link.to.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                }
            >
                {label}
            </a>
        )
    }

    return (
        <Link
            to={link.to}
            hash={link.hash}
            className={className}
            onClick={onClick}
            activeProps={
                activeClassName ? { className: activeClassName } : undefined
            }
            activeOptions={{ exact: link.to === '/' }}
        >
            {label}
        </Link>
    )
}
