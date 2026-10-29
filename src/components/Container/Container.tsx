import type { ReactNode } from 'react'

type ContainerProps = {
    children: ReactNode
    className?: string
}

/** Page column: 1328px content, 16/40/112px gutters (Figma mobile/tablet/desktop). */
export const Container = ({ children, className = '' }: ContainerProps) => (
    <div
        className={`mx-auto w-full max-w-page px-4 sm:px-10 xl:box-content xl:px-28 ${className}`}
    >
        {children}
    </div>
)
