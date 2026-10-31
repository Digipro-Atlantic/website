import { useState } from 'react'
import { Container } from '@/components/Container'
import { faqSections } from '@/data/faq'
import { FaqItem } from './FaqItem'

const itemId = (sectionId: string, index: number) =>
    `${sectionId}-q${index + 1}`

/**
 * Holds `button` at the same height on screen while an answer above it
 * collapses (the 200ms close plus a margin), so the question the reader just
 * clicked does not slide out from under the pointer.
 */
const keepInPlace = (button: HTMLElement) => {
    const start = button.getBoundingClientRect().top
    const until = performance.now() + 300
    const hold = () => {
        const drift = button.getBoundingClientRect().top - start
        if (Math.abs(drift) >= 1) window.scrollBy(0, drift)
        if (performance.now() < until) requestAnimationFrame(hold)
    }
    requestAnimationFrame(hold)
}

/** Every FAQ group. One answer is open at a time across the page; the first starts open. */
export const FaqSections = () => {
    const [openId, setOpenId] = useState<string | null>(() =>
        itemId(faqSections[0].id, 0),
    )

    const toggle = (id: string) => (button: HTMLButtonElement) => {
        keepInPlace(button)
        setOpenId((current) => (current === id ? null : id))
    }

    return (
        <Container>
            {faqSections.map((section) => (
                <section
                    key={section.id}
                    aria-labelledby={section.id}
                    className="mt-20 md:mt-18 xl:mt-32"
                >
                    {/* Jumps land 32px below the sticky header (96px phones, 150px tablet up). */}
                    <h2
                        id={section.id}
                        className="scroll-mt-32 text-center text-h5 font-semibold text-primary-900 md:scroll-mt-46 md:text-h2 xl:text-h1"
                    >
                        {/* Flashed pale green when the reader jumps here from the contents list (see FaqContents). */}
                        <span
                            data-flash
                            className="-mx-3 rounded-lg box-decoration-clone px-3"
                        >
                            {section.title}
                        </span>
                    </h2>
                    <div className="mt-10 flex flex-col gap-2 md:mx-6.25 md:mt-18 md:gap-6 xl:mx-0 xl:mt-20">
                        {section.items.map((item, itemIndex) => {
                            const id = itemId(section.id, itemIndex)
                            return (
                                <FaqItem
                                    key={id}
                                    id={id}
                                    question={item.question}
                                    answer={item.answer}
                                    open={openId === id}
                                    onToggle={toggle(id)}
                                />
                            )
                        })}
                    </div>
                </section>
            ))}
        </Container>
    )
}
