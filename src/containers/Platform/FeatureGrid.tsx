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
    className?: string
}

/** Card grid shared by the Platform, Institutions and Estates pages. */
export const FeatureGrid = ({
    items,
    centerLast = false,
    className = '',
}: FeatureGridProps) => (
    <Container className={className}>
        <RevealGroup>
            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:gap-6">
                {items.map((item, index) => (
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
                                raised={Boolean(item.icon)}
                                className={`h-full p-8 ${item.icon ? 'xl:p-10' : 'xl:p-12'}`}
                            >
                                {item.icon && (
                                    <div
                                        aria-hidden="true"
                                        className="mb-5 flex size-12 items-center justify-center rounded-lg bg-primary-500 text-white md:size-10 xl:mb-7 xl:size-14"
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
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </p>
                                )}
                                <h3 className="text-h6 font-semibold text-grey-900 md:text-body-lg xl:text-h5">
                                    {item.title}
                                </h3>
                                <p className="mt-4 text-body text-grey-600 md:text-body-sm xl:text-body-lg">
                                    {item.description}
                                </p>
                            </Card>
                        </RevealItem>
                    </li>
                ))}
            </ul>
        </RevealGroup>
    </Container>
)
