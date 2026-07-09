import {
    Banknote,
    Building,
    Building2,
    House,
    PlayCircle,
    ShieldCheck,
    type LucideIcon,
} from 'lucide-react'
import type { ProductMenuIconId } from '@/data/types'

const iconStyles: Record<ProductMenuIconId, string> = {
    'property-management': 'bg-teal-600 text-white',
    financing: 'bg-gold text-teal-950',
    estates: 'bg-teal-500 text-white',
    institutions: 'bg-teal-800 text-white',
    security: 'bg-teal-700 text-white',
    tour: 'bg-teal-400 text-teal-950',
}

const icons: Record<ProductMenuIconId, LucideIcon> = {
    'property-management': Building2,
    financing: Banknote,
    estates: House,
    institutions: Building,
    security: ShieldCheck,
    tour: PlayCircle,
}

type ProductMenuIconProps = {
    icon: ProductMenuIconId
    className?: string
}

export const ProductMenuIcon = ({
    icon,
    className = '',
}: ProductMenuIconProps) => {
    const Icon = icons[icon]

    return (
        <span
            className={`inline-flex size-9 shrink-0 items-center justify-center rounded-lg ${iconStyles[icon]} ${className}`}
            aria-hidden="true"
        >
            <Icon className="size-5" strokeWidth={1.75} />
        </span>
    )
}
