import type { ReactNode } from 'react'
import fileIcon from '@/assets/platform/capabilities/file.svg'
import financeIcon from '@/assets/platform/capabilities/finance.svg'
import lockIcon from '@/assets/platform/capabilities/lock.svg'
import messageIcon from '@/assets/platform/capabilities/message.svg'
import spannerIcon from '@/assets/platform/capabilities/spanner.svg'
import walletIcon from '@/assets/platform/capabilities/wallet.svg'
import { capabilities, type CapabilityId } from '@/data/platform'
import { FeatureGrid } from './FeatureGrid'

// Figma's own icon set: 24px on phones, 22px on tablet, 32px on desktop.
const icon = (src: string): ReactNode => (
    <img
        src={src}
        alt=""
        width={32}
        height={32}
        className="size-6 md:size-5.5 xl:size-8"
    />
)

const icons: Record<CapabilityId, ReactNode> = {
    'rent-collection': icon(walletIcon),
    'lease-management': icon(fileIcon),
    maintenance: icon(spannerIcon),
    'document-vault': icon(lockIcon),
    'financial-reporting': icon(financeIcon),
    communications: icon(messageIcon),
}

const items = capabilities.map((capability) => ({
    ...capability,
    icon: icons[capability.id],
}))

export const Capabilities = () => (
    <FeatureGrid items={items} className="mt-12 md:mt-18 xl:mt-30.5" />
)
