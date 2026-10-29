import type { ReactNode } from 'react'
import { SiteLink } from '@/components/SiteLink'
import type { NavLink } from '@/data/types'

/**
 * primary  — #005B4C fill (header "Book a Demo", Pricing "Choose Pro")
 * accent   — terracotta #BD5D3D fill (CTA banner "Book a Demo")
 * outline  — white with #D0D5DD stroke (Pricing "Choose Essential")
 * outlineLight — white stroke on dark green (CTA banner "Become a Partner")
 * gold / ghost — legacy names still used by the Tour page.
 */
export type ButtonVariant =
    'primary' | 'accent' | 'outline' | 'outlineLight' | 'gold' | 'ghost'

export type ButtonSize = 'md' | 'lg'

const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97]'

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-primary-400 text-white hover:bg-primary-600',
    accent: 'bg-secondary-500 text-white hover:bg-secondary-600',
    outline:
        'border border-grey-300 bg-white text-grey-900 hover:border-grey-400 hover:bg-grey-50',
    outlineLight: 'border border-white text-white hover:bg-white/10',
    gold: 'bg-secondary-500 text-white hover:bg-secondary-600',
    ghost: 'border border-white text-white hover:bg-white/10',
}

const sizeClasses: Record<ButtonSize, string> = {
    md: 'h-12 px-4 text-body',
    lg: 'h-12 px-4 text-body xl:h-14 xl:px-5 xl:text-body-lg',
}

type ButtonProps = {
    variant?: ButtonVariant
    size?: ButtonSize
    className?: string
    children?: ReactNode
    onClick?: () => void
} & (
    | { link: NavLink; type?: never }
    | { link?: never; type?: 'button' | 'submit' | 'reset' }
)

export const Button = ({
    variant = 'primary',
    size = 'lg',
    className = '',
    children,
    link,
    onClick,
    type = 'button',
}: ButtonProps) => {
    const classes =
        `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()

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
