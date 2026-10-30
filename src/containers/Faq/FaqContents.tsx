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
            <ol className="mt-10 grid justify-start gap-x-14 gap-y-5.5 pl-6 md:mt-12 md:grid-cols-[auto_auto] md:justify-center md:pl-0 xl:mt-13 xl:gap-x-20 xl:gap-y-7">
                {faqSections.map((section) => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            onClick={scrollToSection(section.id)}
                            className="group flex items-center gap-2.5 text-body-lg font-medium text-black xl:gap-5 xl:text-h6"
                        >
                            <span
                                aria-hidden="true"
                                className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-grey-900 text-white xl:size-7"
                            >
                                <ChevronRight
                                    className="size-3.5"
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
