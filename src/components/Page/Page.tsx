import type { ReactNode } from 'react'

type PageProps = {
    children: ReactNode
    className?: string
}

/**
 * Inner-page shell. The faint green wash behind the hero and first section
 * stands in for Figma's two #005B4C blobs blurred at 500px.
 */
export const Page = ({ children, className = '' }: PageProps) => (
    <main className={`relative isolate overflow-x-clip ${className}`}>
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1600px] bg-[radial-gradient(60%_45%_at_50%_32%,rgb(0_91_76/0.07),transparent_100%)]"
        />
        {children}
    </main>
)
