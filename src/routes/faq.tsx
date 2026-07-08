import { createFileRoute } from '@tanstack/react-router'
import { faqGroups } from '@/data/faq'

export const Route = createFileRoute('/faq')({
    component: FaqPage,
})

function FaqPage() {
    return (
        <main className="py-16">
            <div className="wrap max-w-3xl">
                <span className="font-mono text-sm font-semibold tracking-widest text-gold uppercase">
                    FAQ
                </span>
                <h1 className="font-display mt-2 text-4xl">
                    Frequently asked questions
                </h1>
                <p className="mt-3 text-ink-soft">
                    Answers for owners, tenants, agencies, estates, and
                    institutions.
                </p>

                <div className="mt-10 space-y-10">
                    {faqGroups.map((group) => (
                        <section key={group.category}>
                            <div className="faq-cat">{group.category}</div>
                            {group.items.map((item) => (
                                <details key={item.question} className="faq">
                                    <summary>{item.question}</summary>
                                    <div className="faq-a">{item.answer}</div>
                                </details>
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    )
}
