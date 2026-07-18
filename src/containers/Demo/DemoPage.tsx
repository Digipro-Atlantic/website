import { Reveal } from '@/components/Reveal'
import { demo } from '@/data/demo'
import { site } from '@/data/site'
import { DemoForm } from './DemoForm'

type DemoPageProps = {
    intent?: 'partner'
}

export const DemoPage = ({ intent }: DemoPageProps) => (
    <main className="demo-hero">
        <div className="wrap">
            <div className="demo-grid">
                <Reveal immediate className="demo-copy">
                    <span className="inline-block font-mono text-[15px] font-semibold tracking-[0.12em] text-gold uppercase">
                        {demo.eyebrow}
                    </span>
                    <h1 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] font-semibold tracking-tight text-white">
                        {demo.title}
                    </h1>
                    <p className="mt-5 max-w-[520px] text-[17px] text-white/78">
                        {demo.lead}
                    </p>
                    <ul className="demo-list">
                        {demo.points.map((point) => (
                            <li key={point.title}>
                                <b>{point.title}</b> {point.text}
                            </li>
                        ))}
                    </ul>
                    <p className="demo-alt">
                        {demo.alt}{' '}
                        <a href={`mailto:${site.contact.email}`}>
                            {site.contact.email}
                        </a>
                        .
                    </p>
                </Reveal>

                <Reveal immediate className="demo-form-wrap">
                    <DemoForm intent={intent} />
                </Reveal>
            </div>
        </div>
    </main>
)
