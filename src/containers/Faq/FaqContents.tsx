import { ChevronRight } from 'lucide-react'
import { Container } from '@/components/Container'
import { faqIntro, faqSections } from '@/data/faq'

const scrollToSection = (id: string) => (event: React.MouseEvent) => {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'start',
    })
    window.history.replaceState(null, '', `#${id}`)
}

export const FaqContents = () => (
    <Container className="mt-10 md:mt-18 xl:mt-32">
        <nav aria-labelledby="faq-contents-title">
            <h2
                id="faq-contents-title"
                className="text-center text-h5 font-semibold text-primary-900 md:text-h2 xl:text-h1"
            >
                {faqIntro.contentsTitle}
            </h2>
            <ol className="mt-10 grid justify-start gap-y-6 pl-2 md:mt-12 md:grid-cols-[auto_auto] md:justify-center md:gap-x-10 md:pl-0 xl:mt-16 xl:gap-x-20">
                {faqSections.map((section) => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            onClick={scrollToSection(section.id)}
                            className="group flex items-center gap-4 text-body-lg font-medium text-black xl:text-h6"
                        >
                            <span
                                aria-hidden="true"
                                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-grey-900 text-white xl:size-8"
                            >
                                <ChevronRight
                                    className="size-4 xl:size-5"
                                    strokeWidth={2.5}
                                />
                            </span>
                            <span className="underline underline-offset-4 decoration-1 group-hover:text-primary-400">
                                {section.contentsLabel}
                            </span>
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    </Container>
)
