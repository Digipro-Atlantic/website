import { Container } from '@/components/Container'
import { CtaBanner } from '@/components/CtaBanner'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import { securityCards, securityHero } from '@/data/security'

export const SecurityPage = () => (
    <Page>
        <PageHero
            label={securityHero.label}
            title={securityHero.title}
            description={securityHero.description}
            // Figma breaks the heading after "data"; plain wrapping (not balanced) reproduces it.
            titleClassName="md:max-w-190 md:text-wrap! xl:max-w-225"
        />

        <Container className="mt-11 md:mt-17 xl:mt-18">
            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:gap-6">
                {securityCards.map((card, index) => (
                    <li
                        key={card.title}
                        className="rounded-lg border border-grey-100 bg-white p-8 pb-7 md:pb-9 xl:px-12 xl:pt-12 xl:pb-17"
                    >
                        <div className="flex items-center justify-between text-body-sm font-medium xl:text-body">
                            <p className="text-primary-500 uppercase">
                                {card.category}
                            </p>
                            <p aria-hidden="true" className="text-grey-300">
                                {String(index + 1).padStart(2, '0')}
                            </p>
                        </div>
                        <h2 className="mt-4 text-h6 font-semibold text-grey-900 md:text-body-lg xl:text-h5">
                            {card.title}
                        </h2>
                        <p className="mt-3 text-body text-grey-600 md:text-body-sm xl:text-body-lg">
                            {card.description}
                        </p>
                    </li>
                ))}
            </ul>
        </Container>

        <CtaBanner />
    </Page>
)
