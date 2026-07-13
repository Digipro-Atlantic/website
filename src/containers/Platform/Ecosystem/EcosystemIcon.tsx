import type { ReactNode } from 'react'
import type { EcosystemIconId } from '@/data/types'

const svgClassName =
    'h-[21px] w-[21px] fill-none stroke-teal-600 [stroke-width:1.7]'

const icons: Record<EcosystemIconId, ReactNode> = {
    marketplace: (
        <>
            <path d="M14 4l6 6-9 9-6 1 1-6z" />
            <path d="M12 6l6 6" />
        </>
    ),
    integrations: (
        <>
            <path d="M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </>
    ),
    mobile: (
        <>
            <rect x="7" y="2" width="10" height="20" rx="2" />
            <path d="M11 18h2" />
        </>
    ),
}

type EcosystemIconProps = {
    icon: EcosystemIconId
}

export const EcosystemIcon = ({ icon }: EcosystemIconProps) => (
    <svg viewBox="0 0 24 24" className={svgClassName} aria-hidden="true">
        {icons[icon]}
    </svg>
)
