import type { ReactNode } from 'react'
import { Container } from '@/components/Container'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import type { LegalBlock, LegalDoc } from '@/data/legal'

/** Renders `**bold**` and `[label](href)` markup used in the legal copy. */
const renderBold = (text: string): ReactNode[] =>
    text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? (
            <strong key={i} className="font-semibold">
                {part}
            </strong>
        ) : (
            part
        ),
    )

const renderInline = (text: string): ReactNode[] =>
    text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (!link) return <span key={i}>{renderBold(part)}</span>
        return (
            <a
                key={i}
                href={link[2]}
                className="underline underline-offset-4 hover:text-primary-400"
            >
                {renderBold(link[1])}
            </a>
        )
    })

// Figma spacing: one blank line between blocks, a smaller gap under a sub-heading, none for `tight` blocks.
const topGap = (blocks: LegalBlock[], i: number) => {
    const block = blocks[i]
    if (i === 0) return ''
    if (block.type === 'h3') return 'mt-6 xl:mt-8'
    if (blocks[i - 1].type === 'h3') return 'mt-4'
    return block.tight ? '' : 'mt-6 xl:mt-6.5'
}

const Blocks = ({ blocks }: { blocks: LegalBlock[] }) =>
    blocks.map((block, i) => {
        const className = topGap(blocks, i)
        if (block.type === 'h3') {
            return (
                <h3
                    key={i}
                    className={`${className} text-body-lg font-bold text-grey-900 xl:text-h5`}
                >
                    {block.text}
                </h3>
            )
        }
        if (block.type === 'ul') {
            return (
                <ul
                    key={i}
                    className={`${className} list-disc pl-6 marker:text-grey-600`}
                >
                    {block.items.map((item) => (
                        <li key={item}>{renderInline(item)}</li>
                    ))}
                </ul>
            )
        }
        return (
            <p key={i} className={className}>
                {renderInline(block.text)}
            </p>
        )
    })

export const LegalDocument = ({ doc }: { doc: LegalDoc }) => (
    <Page>
        <PageHero title={doc.title}>
            <p className="mt-4 text-body text-grey-700 xl:text-body-lg">
                Last Updated {doc.lastUpdated}
            </p>
        </PageHero>
        <Container className="pt-16 pb-24 xl:pt-22 xl:pb-36">
            <div className="mx-auto max-w-220 text-body text-grey-600 xl:text-body-lg">
                <Blocks blocks={doc.intro} />
                {doc.sections.map((section) => (
                    <section key={section.heading}>
                        <h2 className="mt-6 text-h6 font-bold text-grey-900 xl:mt-8 xl:text-h4">
                            {section.heading}
                        </h2>
                        <div className="mt-4">
                            <Blocks blocks={section.blocks} />
                        </div>
                    </section>
                ))}
            </div>
        </Container>
    </Page>
)
