import type { ReactNode } from 'react'
import { SiteLink } from '@/components/SiteLink'
import type { NavLink } from '@/data/types'

export type ButtonVariant = 'gold' | 'ghost' | 'dark' | 'outline'

const variantClasses: Record<ButtonVariant, string> = {
    gold: 'btn btn-gold',
    ghost: 'btn btn-ghost',
    dark: 'btn btn-dark',
    outline: 'btn btn-outline',
}

type ButtonProps = {
    variant?: ButtonVariant
    className?: string
    children?: ReactNode
    onClick?: () => void
} & (
    | { link: NavLink; type?: never }
    | { link?: never; type?: 'button' | 'submit' | 'reset' }
)

export const Button = ({
    variant = 'gold',
    className = '',
    children,
    link,
    onClick,
    type = 'button',
}: ButtonProps) => {
    const classes = `${variantClasses[variant]} ${className}`.trim()

    if (link) {
        return (
            <SiteLink link={link} className={classes} onClick={onClick}>
                {children ?? link.label}
            </SiteLink>
        )
    }

    return (
        <button type={type} className={classes} onClick={onClick}>
            {children}
        </button>
    )
}
