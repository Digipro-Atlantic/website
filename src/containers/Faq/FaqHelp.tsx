import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { faqHelp } from '@/data/faq'

export const FaqHelp = () => (
    <Container className="mt-24 text-center md:mt-20 xl:mt-28">
        <section aria-labelledby="faq-help-title">
            <h2
                id="faq-help-title"
                className="text-h5 font-semibold text-primary-900 md:text-h2 xl:text-h1"
            >
                {faqHelp.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[381px] text-body text-grey-600 md:max-w-none md:text-body xl:mt-4 xl:text-body-lg xl:font-medium">
                {faqHelp.description}
            </p>
            <Button
                link={faqHelp.action}
                className="mt-10 h-14 w-55 md:h-16 md:w-62.5 md:text-body-lg xl:h-16"
            >
                {faqHelp.action.label}
            </Button>
        </section>
    </Container>
)
