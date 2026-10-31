import heroGrid from '@/assets/home/hero-grid.png'
import shadowLeft from '@/assets/home/hero-shadow-left.svg'
import shadowRight from '@/assets/home/hero-shadow-right.svg'
import { Container } from '@/components/Container'
import { hero } from '@/data/home'
import { CursorTrail } from './CursorTrail'
import { HeroDashboards } from './HeroDashboards'
import { HeroDemoForm } from './HeroDemoForm'

export const Hero = () => (
    <section className="relative isolate overflow-x-clip">
        {/* Faded grid corners (Figma frames 10470:25392 / 10470:25405). Mobile has no grid, only the glow (Figma 9773:89903). */}
        <img
            src={heroGrid}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 -z-10 hidden w-[45%] max-w-[775px] sm:block"
        />
        <img
            src={heroGrid}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 -z-10 hidden w-[45%] max-w-[775px] rotate-180 sm:block"
        />
        {/* After the grid: its export has an opaque white backdrop and would cover the glow. */}
        <CursorTrail />

        <Container className="pt-16 sm:pt-18 xl:pt-26">
            <div className="flex flex-col items-center text-center">
                <p className="text-body-lg font-semibold text-[#0c1017] sm:text-h6 sm:font-medium xl:text-h5">
                    {hero.eyebrow[0]}
                    <br className="sm:hidden" /> {hero.eyebrow[1]}
                </p>
                <h1 className="mt-2 text-h4 font-semibold text-primary-900 sm:mt-4 sm:text-display-sm xl:mt-6 xl:text-display-lg">
                    {hero.title[0]}
                    <br /> {hero.title[1]}
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

                <HeroDashboards />
            </div>
        </Container>
    </section>
)
