import { Fragment } from 'react'
import ctaMark from '@/assets/home/cta-mark.svg'
import { Container } from '@/components/Container'
import { SiteLink } from '@/components/SiteLink'
import { cta } from '@/data/home'

const lines = (text: readonly string[]) =>
    text.map((line, index) => (
        <Fragment key={line}>
            {index > 0 && <br />}
            {line}
        </Fragment>
    ))

const buttonClass =
    'inline-flex h-14 items-center justify-center rounded-lg px-4 text-body font-medium transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] md:h-10 md:text-body-sm xl:h-14 xl:text-body-lg'

export const CtaBanner = () => (
    <Container className="my-24 xl:my-36">
        <section
            aria-labelledby="cta-title"
            className="relative isolate overflow-hidden rounded-2xl bg-linear-to-r from-primary-400 from-63% to-[#00c1a1] px-4 py-12 text-center text-white text-shadow-[0_40px_72px_rgb(16_25_40/0.14)] sm:px-10 md:py-10 xl:pt-14 xl:pb-16"
        >
            <img
                src={ctaMark}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute top-[71px] left-1/2 -z-10 w-[559px] max-w-none -translate-x-1/2 -scale-x-100 md:top-[-110px] md:left-[calc(50%-3px)] md:w-193.5 xl:top-[-149px] xl:left-[calc(50%-4px)] xl:w-272"
            />

            <p className="text-body font-semibold md:text-body-sm xl:text-body-lg">
                {cta.label}
            </p>
            <h2
                id="cta-title"
                className="mt-4 text-h5 font-semibold md:text-h3 xl:text-display-sm"
            >
                {lines(cta.title)}
            </h2>
            <p className="mt-6 text-body md:mt-4 md:text-body-sm xl:text-body-lg">
                {lines(cta.description)}
            </p>

            <div className="mt-6 flex flex-col gap-2 md:flex-row md:justify-center md:gap-3 xl:mt-10 xl:gap-2">
                <SiteLink
                    link={cta.actions.primary}
                    className={`${buttonClass} bg-secondary-500 hover:bg-secondary-600 xl:w-40`}
                />
                <SiteLink
                    link={cta.actions.secondary}
                    className={`${buttonClass} border border-white hover:bg-white/10 xl:w-50`}
                />
            </div>
        </section>
    </Container>
)
