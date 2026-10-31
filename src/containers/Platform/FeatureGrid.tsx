import type { ReactNode } from 'react'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { RevealGroup, RevealItem } from '@/components/Reveal'

export type FeatureGridItem = {
    id: string
    title: string
    description: string
    /** Icon tile at the top of the card (Platform). */
    icon?: ReactNode
    /** Uppercase label with a "01" index on the right (Institutions). */
    category?: string
}

type FeatureGridProps = {
    items: readonly FeatureGridItem[]
    /** A lone last card on a row of three sits in the middle column (Estates). */
    centerLast?: boolean
    /** Lift and green hover glow on cards without an icon too (Estates, Institutions). */
    hoverable?: boolean
    /** Gap above each description; Estates opens it to 24px on phones. */
    descriptionClassName?: string
    className?: string
}

// Platform and Estates cards hover like the home "Find your way around" cards:
// the grey lift becomes a green glow (Figma Variant2).
const hoverGlow =
    'transition-shadow duration-200 ease-[ease] hover:shadow-[0_1px_80px_0_rgb(0_91_76/0.2)]'

/** Card grid shared by the Platform, Institutions and Estates pages. */
export const FeatureGrid = ({
    items,
    centerLast = false,
    hoverable = false,
    descriptionClassName = 'mt-4',
    className = '',
}: FeatureGridProps) => (
    <Container className={className}>
        <RevealGroup>
            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:gap-6">
                {items.map((item, index) => {
                    const glows = hoverable || Boolean(item.icon)
                    return (
                        <li
                            key={item.id}
                            className={
                                centerLast && index === items.length - 1
                                    ? 'md:col-start-2'
                                    : undefined
                            }
                        >
                            <RevealItem className="h-full">
                                <Card
                                    raised={glows}
                                    className={`group h-full p-8 ${item.icon ? 'xl:p-10' : 'xl:p-12'} ${glows ? hoverGlow : ''}`}
                                >
                                    {item.icon && (
                                        <div
                                            aria-hidden="true"
                                            className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary-500 text-white md:size-10 xl:mb-6 xl:size-14"
                                        >
                                            {item.icon}
                                        </div>
                                    )}
                                    {item.category && (
                                        <p className="mb-4 flex items-baseline justify-between gap-4 text-body-sm font-medium text-primary-500 uppercase xl:text-body">
                                            <span>{item.category}</span>
                                            <span
                                                aria-hidden="true"
                                                className="text-grey-300"
                                            >
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>
                                        </p>
                                    )}
                                    <h3
                                        className={`text-h6 font-semibold text-grey-900 md:text-body-lg xl:text-h5 ${
                                            glows
                                                ? 'transition-colors duration-200 ease-[ease] group-hover:text-primary-400'
                                                : ''
                                        }`}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className={`text-body text-grey-600 md:text-body-sm xl:text-body-lg ${descriptionClassName}`}
                                    >
                                        {item.description}
                                    </p>
                                </Card>
                            </RevealItem>
                        </li>
                    )
                })}
            </ul>
        </RevealGroup>
    </Container>
)
