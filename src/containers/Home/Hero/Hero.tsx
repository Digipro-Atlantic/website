import { Button } from '@/components/Button'
import { Reveal } from '@/components/Reveal'
import { hero, trustChips } from '@/data/home'
import { EstateArt } from './EstateArt'

export const Hero = () => (
    <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />

        <div className="wrap">
            <div className="relative grid items-center gap-10 py-16 max-[980px]:gap-2.5 max-[980px]:py-16 min-[981px]:grid-cols-[1.1fr_0.9fr] min-[981px]:py-[88px] min-[981px]:pb-24">
                <Reveal immediate>
                    <span className="inline-block font-mono text-[15px] font-semibold tracking-[0.12em] text-gold uppercase">
                        {hero.eyebrow}
                    </span>
                    <h1 className="font-display text-[clamp(2.375rem,5.4vw,4.25rem)] leading-[1.08] font-semibold tracking-tight">
                        {hero.headline}{' '}
                        <em className="font-normal text-gold-soft not-italic">
                            {hero.headlineEmphasis}
                        </em>
                    </h1>
                    <div className="flex flex-wrap gap-3.5 mt-6">
                        <Button variant="gold" link={hero.ctas.primary} />
                        <Button variant="ghost" link={hero.ctas.secondary} />
                    </div>
                </Reveal>

                <div className="hidden h-[380px] min-[981px]:block">
                    <EstateArt />
                </div>
            </div>
        </div>

        <div className="border-t border-white/10 bg-black/18">
            <div className="wrap flex flex-wrap items-center gap-x-[34px] gap-y-3.5 px-7 py-5 text-[13px] text-white/72">
                {trustChips.map((chip) => (
                    <span key={chip} className="chip">
                        {chip}
                    </span>
                ))}
            </div>
        </div>
    </section>
)
