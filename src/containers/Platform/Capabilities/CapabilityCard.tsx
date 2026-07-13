import type { PlatformCapability } from '@/data/types'
import { CapabilityIcon } from './CapabilityIcon'

type CapabilityCardProps = {
    capability: PlatformCapability
}

export const CapabilityCard = ({ capability }: CapabilityCardProps) => (
    <article className="h-full bg-paper p-[30px] transition-colors hover:bg-teal-100">
        <div className="mb-[18px] flex h-[42px] w-[42px] items-center justify-center rounded-[9px] bg-teal-800">
            <CapabilityIcon icon={capability.icon} />
        </div>
        <h4 className="mb-2 font-body text-[16.5px] font-semibold">
            {capability.title}
        </h4>
        <p className="text-[15px] text-ink-soft">{capability.description}</p>
    </article>
)
