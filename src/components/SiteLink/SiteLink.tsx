import { Link } from '@tanstack/react-router'
import type { NavLink } from '@/data/types'

type SiteLinkProps = {
    link: NavLink
    className?: string
    activeClassName?: string
    onClick?: () => void
}

export const SiteLink = ({
    link,
    className = '',
    activeClassName = '',
    onClick,
}: SiteLinkProps) => {
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
                {link.label}
            </a>
        )
    }

    return (
        <Link
            to={link.to}
            className={className}
            onClick={onClick}
            activeProps={
                activeClassName ? { className: activeClassName } : undefined
            }
            activeOptions={{ exact: link.to === '/' }}
        >
            {link.label}
        </Link>
    )
}
