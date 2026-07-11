import { Button } from '@/components/Button'
import { cta } from '@/data/home'

export const Cta = () => (
    <section
        id="cta"
        className="cta py-24 text-center text-white max-[680px]:py-16"
    >
        <div className="wrap">
            <span className="inline-block font-mono text-[15px] font-semibold tracking-[0.12em] text-gold uppercase">
                {cta.eyebrow}
            </span>
            <h2 className="font-display mx-auto mt-4 max-w-[760px] text-[clamp(1.875rem,4vw,3.125rem)] leading-[1.08] font-semibold tracking-tight">
                {cta.headline}
            </h2>
            <p className="mx-auto mt-5 mb-8 max-w-[560px] text-[17px] text-white/78">
                {cta.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
                <Button variant="gold" link={cta.actions.primary} />
                <Button variant="ghost" link={cta.actions.secondary} />
            </div>
        </div>
    </section>
)
