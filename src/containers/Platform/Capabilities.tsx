import type { ReactNode } from 'react'
import {
    ChartNoAxesColumn,
    FileText,
    Lock,
    MessageSquareText,
    Wallet,
    Wrench,
} from 'lucide-react'
import { capabilities, type CapabilityId } from '@/data/platform'
import { FeatureGrid } from './FeatureGrid'

const iconClassName = 'size-6 md:size-5 xl:size-7'

const icons: Record<CapabilityId, ReactNode> = {
    'rent-collection': <Wallet className={iconClassName} />,
    'lease-management': <FileText className={iconClassName} />,
    maintenance: <Wrench className={iconClassName} />,
    'document-vault': <Lock className={iconClassName} />,
    'financial-reporting': <ChartNoAxesColumn className={iconClassName} />,
    communications: <MessageSquareText className={iconClassName} />,
}

const items = capabilities.map((capability) => ({
    ...capability,
    icon: icons[capability.id],
}))

export const Capabilities = () => (
    <FeatureGrid items={items} className="mt-11 md:mt-16 xl:mt-29" />
)
