import dashboard from '@/assets/home/hero-dashboard.png'
import heroGrid from '@/assets/home/hero-grid.png'
import shadowLeft from '@/assets/home/hero-shadow-left.svg'
import shadowRight from '@/assets/home/hero-shadow-right.svg'
import { Container } from '@/components/Container'
import { hero } from '@/data/home'
import { CursorTrail } from './CursorTrail'
import { HeroDemoForm } from './HeroDemoForm'

export const Hero = () => (
    <section className="relative isolate overflow-x-clip">
        <CursorTrail />
        {/* Faded grid corners (Figma frames 10470:25392 / 10470:25405). */}
        <img
            src={heroGrid}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 -z-10 w-[45%] max-w-[775px]"
        />
        <img
            src={heroGrid}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 -z-10 w-[45%] max-w-[775px] rotate-180"
        />

        <Container className="pt-16 sm:pt-18 xl:pt-26">
            <div className="mx-auto flex max-w-[48.875rem] flex-col items-center text-center">
                <p className="text-body-lg text-grey-900 xl:text-[1.25rem]">
                    {hero.eyebrow}
                </p>
                <h1 className="mt-2 text-h4 font-semibold text-balance text-primary-900 sm:mt-4 sm:text-display-sm xl:mt-6 xl:text-display-lg">
                    {hero.title}
                </h1>
                <HeroDemoForm className="mt-6 sm:mt-8 xl:mt-10" />
            </div>

            <div className="relative mt-10 sm:mt-16 xl:mt-32">
                {/* Soft green glow beneath the dashboard (Figma 10470:25390 / 10470:25391). */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[36.97%] left-[-4.89%] -z-10 h-[24.68%] w-[64.6%]"
                >
                    <img
                        src={shadowLeft}
                        alt=""
                        className="absolute inset-[-343.35%_-93.24%] size-full max-w-none"
                    />
                </div>
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[36.97%] left-[40.36%] -z-10 h-[22.35%] w-[66.79%]"
                >
                    <img
                        src={shadowRight}
                        alt=""
                        className="absolute inset-[-379.15%_-90.19%] size-full max-w-none"
                    />
                </div>

                {/* The export has a white backdrop baked in; crop to the card and redo its shadow. */}
                <div className="relative aspect-[1331/947] overflow-hidden rounded-lg shadow-4xl sm:rounded-2xl xl:rounded-3xl">
                    <img
                        src={dashboard}
                        alt="Zebul tenant dashboard showing an active lease, rent status, payment score and recent activity"
                        width={1364}
                        height={996}
                        fetchPriority="high"
                        className="absolute top-[-0.106%] left-[-1.202%] w-[102.479%] max-w-none"
                    />
                </div>
            </div>
        </Container>
    </section>
)
