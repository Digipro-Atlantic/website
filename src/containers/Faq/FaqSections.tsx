import { Container } from '@/components/Container'
import { faqSections } from '@/data/faq'
import { FaqItem } from './FaqItem'

export const FaqSections = () => (
    <Container>
        {faqSections.map((section, index) => (
            <section
                key={section.id}
                aria-labelledby={section.id}
                className="mt-20 scroll-mt-20 md:mt-17 xl:mt-34 xl:scroll-mt-28"
            >
                <h2
                    id={section.id}
                    className="scroll-mt-20 text-center text-h5 font-semibold text-primary-900 md:text-h2 xl:text-h1 xl:scroll-mt-28"
                >
                    {section.title}
                </h2>
                <div className="mt-9 flex flex-col gap-2 md:mt-16 md:gap-6 xl:mt-18">
                    {section.items.map((item, itemIndex) => (
                        <FaqItem
                            key={item.question}
                            question={item.question}
                            answer={item.answer}
                            defaultOpen={index === 0 && itemIndex === 0}
                        />
                    ))}
                </div>
            </section>
        ))}
    </Container>
)
