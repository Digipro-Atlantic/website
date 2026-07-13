import { Reveal } from '@/components/Reveal'
import type { SecGridItem } from '@/data/types'
import { SecItem } from './SecItem'

type SecGridProps = {
    items: readonly SecGridItem[]
}

export const SecGrid = ({ items }: SecGridProps) => (
    <div className="grid grid-cols-1 gap-[18px] min-[681px]:grid-cols-2 min-[981px]:grid-cols-4">
        {items.map((item) => (
            <Reveal key={item.id}>
                <SecItem item={item} />
            </Reveal>
        ))}
    </div>
)
