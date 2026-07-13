import type { SecGridItem } from '@/data/types'

type SecItemProps = {
    item: SecGridItem
}

export const SecItem = ({ item }: SecItemProps) => (
    <article className="rounded-xl border border-line bg-paper p-6">
        <div className="mb-2.5 font-mono text-[12.5px] font-semibold tracking-[0.1em] text-gold uppercase">
            {item.tag}
        </div>
        <h4 className="mb-1.5 font-body text-[15px] font-semibold">
            {item.title}
        </h4>
        <p className="text-[13px] text-ink-soft">{item.description}</p>
    </article>
)
