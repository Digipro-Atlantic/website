import { useRouterState } from '@tanstack/react-router'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Page } from '@/components/Page'
import { notFound } from '@/data/not-found'
import { site } from '@/data/site'

export const NotFoundPage = () => {
    const pathname = useRouterState({ select: (s) => s.location.pathname })

    return (
        <Page>
            {/* React 19 hoists these into <head>; noindex keeps missing pages out of search. */}
            <title>{`Page not found | ${site.name}`}</title>
            <meta name="robots" content="noindex" />
            <Container className="flex flex-col items-center pt-16 pb-24 text-center md:pt-18 xl:pt-36 xl:pb-36">
                <p
                    aria-hidden="true"
                    className="text-[96px] leading-none font-semibold tracking-[-0.04em] text-primary-400/15 select-none md:text-[128px] xl:text-[160px]"
                >
                    404
                </p>

                <h1 className="mt-4 max-w-160 text-h4 font-semibold text-balance text-primary-900 md:text-h1 xl:text-display-sm">
                    {notFound.headline}
                </h1>

                <p className="mt-4 max-w-140 text-body text-balance text-grey-700 xl:text-body-lg">
                    {notFound.description}
                </p>

                <p className="mt-3 max-w-140 text-body-sm break-all text-grey-500">
                    Requested path:{' '}
                    <span className="text-grey-700">{pathname}</span>
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3 xl:mt-10">
                    <Button variant="primary" link={notFound.primary} />
                    <Button variant="outline" link={notFound.secondary} />
                </div>
            </Container>
        </Page>
    )
}
