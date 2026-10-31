import type { ReactNode } from 'react'

type ContainerProps = {
    children: ReactNode
    className?: string
}

/**
 * Page column: 1328px content, 16/40/112px gutters (Figma mobile/tablet/desktop).
 * At xl the max width applies to the content box, so width must be auto there:
 * `w-full` plus 224px of padding would overflow the viewport below 1552px.
 */
export const Container = ({ children, className = '' }: ContainerProps) => (
    <div
        className={`mx-auto w-full max-w-page px-4 sm:px-10 xl:box-content xl:w-auto xl:px-28 ${className}`}
    >
        {children}
    </div>
)
