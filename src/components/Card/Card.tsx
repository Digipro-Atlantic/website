import type { ElementType, ReactNode } from 'react'

type CardProps = {
    children: ReactNode
    as?: ElementType
    /** Platform-style lift: Figma drop shadow 0 -6 24 #111 @ 8%. */
    raised?: boolean
    className?: string
}

/** White panel with the Figma hairline (#F0F2F5) and 8px corners. Padding is set per use. */
export const Card = ({
    children,
    as: Tag = 'article',
    raised = false,
    className = '',
}: CardProps) => (
    <Tag
        className={`rounded-lg border border-grey-100 bg-white ${raised ? 'shadow-[0_-6px_24px_rgb(17_17_17/0.08)]' : ''} ${className}`}
    >
        {children}
    </Tag>
)
