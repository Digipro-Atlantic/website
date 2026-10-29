import type { ReactNode } from 'react'
import { Container } from '@/components/Container'

type PageHeroProps = {
    label?: string
    title: string
    description?: ReactNode
    /** Width cap for the heading, e.g. to force the Figma line break. */
    titleClassName?: string
    className?: string
    children?: ReactNode
}

/**
 * Centred label / h1 / lead that opens every inner page.
 * Figma: label 24/500 → 20 → 18, title 48/600 → 40 → 28, lead 18 → 16.
 */
export const PageHero = ({
    label,
    title,
    description,
    titleClassName = '',
    className = '',
    children,
}: PageHeroProps) => (
    <Container className={`pt-16 text-center md:pt-18 xl:pt-36 ${className}`}>
        <div className="mx-auto flex max-w-306 flex-col items-center">
            {label && (
                <p className="text-body-lg font-medium text-grey-800 md:text-h6 xl:text-h5">
                    {label}
                </p>
            )}
            <h1
                className={`text-h4 font-semibold text-balance text-primary-900 md:text-h1 xl:text-display-sm ${label ? 'mt-4' : ''} ${titleClassName}`}
            >
                {title}
            </h1>
            {description && (
                <p className="mt-4 max-w-235 text-body text-balance text-grey-700 xl:mt-2 xl:text-body-lg">
                    {description}
                </p>
            )}
            {children}
        </div>
    </Container>
)
