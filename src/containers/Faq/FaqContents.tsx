import { ChevronRight } from 'lucide-react'
import { Container } from '@/components/Container'
import { faqIntro, faqSections } from '@/data/faq'

// "You are here": once the scroll settles, the section title washes pale
// green and fades out. Colour only, so it also runs with reduced motion.
const flashTitle = (section: HTMLElement) => {
    const title = section.querySelector<HTMLElement>('[data-flash]')
    // Easing sits on the fade segment only, so the first 30% is a true hold.
    title?.animate(
        [
            { backgroundColor: 'rgb(226 252 244 / 1)', easing: 'linear' }, // primary-50
            {
                backgroundColor: 'rgb(226 252 244 / 1)',
                offset: 0.3,
                easing: 'cubic-bezier(0.77, 0, 0.175, 1)', // --ease-in-out
            },
            { backgroundColor: 'rgb(226 252 244 / 0)' },
        ],
        { duration: 1400 },
    )
}

/** Runs `callback` once the page stops scrolling (or after a fallback, if it never moved). */
const afterScroll = (callback: () => void) => {
    let done = false
    const run = () => {
        if (done) return
        done = true
        window.removeEventListener('scrollend', run)
        callback()
    }
    window.addEventListener('scrollend', run, { once: true })
    window.setTimeout(run, 1000)
}

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
    afterScroll(() => flashTitle(target))
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
                                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-grey-900 text-white transition-[translate,background-color] duration-150 ease-out group-hover:translate-x-0.5 group-hover:bg-primary-400 motion-reduce:group-hover:translate-x-0 xl:size-8"
                            >
                                <ChevronRight
                                    className="size-4 xl:size-5"
                                    strokeWidth={2.5}
                                />
                            </span>
                            <span className="underline decoration-1 underline-offset-4 transition-colors duration-150 ease-[ease] group-hover:text-primary-400">
                                {section.contentsLabel}
                            </span>
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    </Container>
)
