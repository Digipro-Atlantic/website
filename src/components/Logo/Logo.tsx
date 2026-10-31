import { Link } from '@tanstack/react-router'
import logo from '@/assets/brand/zebul-logo.svg'
import logoWhite from '@/assets/brand/zebul-logo-white.png'

const logos = {
    color: logo,
    // Legacy PNG — only the old Tour mocks use it. Replace when Tour is rebuilt.
    white: logoWhite,
} as const

type LogoProps = {
    variant?: keyof typeof logos
    /** Size with a height class, e.g. `h-10`; width follows the aspect ratio. */
    className?: string
    to?: string | false
    onClick?: () => void
}

export const Logo = ({
    variant = 'color',
    className = 'h-8',
    to = '/',
    onClick,
}: LogoProps) => {
    const img = (
        <img
            src={logos[variant]}
            alt="Zebul"
            className={`block w-auto ${className}`}
        />
    )

    if (to === false) return img

    return (
        <Link
            to={to}
            className="inline-flex shrink-0 items-center"
            aria-label="Zebul home"
            onClick={onClick}
        >
            {img}
        </Link>
    )
}
