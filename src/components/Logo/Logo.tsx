import { Link } from '@tanstack/react-router'
import logoWhite from '@/assets/brand/zebul-logo-white.png'
import logoOnGreen from '@/assets/brand/zebul-logo-ongreen.png'
import logoColor from '@/assets/brand/zebul-logo.png'

const logos = {
    white: logoWhite,
    ongreen: logoOnGreen,
    color: logoColor,
} as const

const sizes = {
    nav: 'logo-img',
    footer: 'logo-img logo-img--footer',
    ui: 'ui-logo',
} as const

type LogoProps = {
    variant?: keyof typeof logos
    size?: keyof typeof sizes
    className?: string
    to?: string | false
}

export const Logo = ({
    variant = 'white',
    size = 'nav',
    className = '',
    to = '/',
}: LogoProps) => {
    const img = (
        <img
            src={logos[variant]}
            alt="Zebul"
            className={`${sizes[size]} ${className}`.trim()}
        />
    )

    if (to === false) return img

    return (
        <Link
            to={to}
            className="logo inline-flex items-center"
            aria-label="Zebul home"
        >
            {img}
        </Link>
    )
}
