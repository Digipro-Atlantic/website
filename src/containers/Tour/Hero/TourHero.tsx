import { Button } from '@/components/Button'
import { Reveal } from '@/components/Reveal'
import { tourHero } from '@/data/tour'

export const TourHero = () => (
    <section className="bg-[linear-gradient(165deg,var(--color-teal-950),var(--color-teal-800))] px-0 py-16 text-center text-white [background-image:radial-gradient(900px_500px_at_80%_-10%,rgba(180,134,43,0.16),transparent_60%),linear-gradient(165deg,var(--color-teal-950),var(--color-teal-800))]">
        <div className="wrap">
            <Reveal immediate>
                <span className="inline-block font-mono text-[15px] font-semibold tracking-[0.12em] text-gold-soft uppercase">
                    {tourHero.eyebrow}
                </span>
                <h1 className="font-display mx-auto mt-3.5 max-w-[780px] text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.08] font-semibold tracking-tight">
                    {tourHero.title}
                </h1>
                <p className="mx-auto mt-[18px] max-w-[600px] text-[17px] text-white/82">
                    {tourHero.description}
                </p>
                <div className="mt-[26px] flex flex-wrap justify-center gap-3.5">
                    <Button variant="gold" link={tourHero.ctas.primary} />
                    <Button variant="ghost" link={tourHero.ctas.secondary} />
                </div>
                <p className="mt-5 font-mono text-[11.5px] tracking-wide text-white/58">
                    {tourHero.note}
                </p>
            </Reveal>
        </div>
    </section>
)
