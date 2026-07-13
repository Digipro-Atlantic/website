import type { ReactNode } from 'react'
import type { CapabilityIconId } from '@/data/types'

const svgClassName =
    'h-[22px] w-[22px] fill-none stroke-gold-soft [stroke-width:1.7]'

const icons: Record<CapabilityIconId, ReactNode> = {
    'rent-collection': (
        <>
            <rect x="3" y="6" width="18" height="13" rx="2" />
            <path d="M3 10h18M7 15h4" />
        </>
    ),
    'lease-management': (
        <>
            <path d="M6 3h9l4 4v14H6z" />
            <path d="M14 3v5h5M9 13h7M9 17h7" />
        </>
    ),
    maintenance: (
        <>
            <path d="M14 4l6 6-9 9-6 1 1-6z" />
            <path d="M12 6l6 6" />
        </>
    ),
    'document-vault': (
        <>
            <path d="M4 19V5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2z" />
            <path d="M9 13l2 2 4-4" />
        </>
    ),
    'financial-reporting': <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
    communications: (
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    ),
}

type CapabilityIconProps = {
    icon: CapabilityIconId
}

export const CapabilityIcon = ({ icon }: CapabilityIconProps) => (
    <svg viewBox="0 0 24 24" className={svgClassName} aria-hidden="true">
        {icons[icon]}
    </svg>
)
