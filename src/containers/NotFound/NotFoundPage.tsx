import { useEffect } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { Button } from '@/components/Button'
import { Reveal } from '@/components/Reveal'
import { SiteLink } from '@/components/SiteLink'
import { notFound } from '@/data/not-found'
import { site } from '@/data/site'

export const NotFoundPage = () => {
    const pathname = useRouterState({ select: (s) => s.location.pathname })

    useEffect(() => {
        const previous = document.title
        document.title = `Page not found | ${site.name}`
        return () => {
            document.title = previous
        }
    }, [])

    return (
        <main className="hero min-h-[min(72vh,720px)]" id="not-found">
            <div className="hero-grid" aria-hidden="true" />

            <div className="wrap relative py-20 max-[680px]:py-16 min-[981px]:py-28">
                <Reveal immediate className="mx-auto max-w-[640px] text-center">
                    <p
                        className="font-display text-[clamp(5rem,14vw,8.5rem)] leading-none font-semibold tracking-tight text-white/10 select-none"
                        aria-hidden="true"
                    >
                        404
                    </p>

                    <span className="mt-2 inline-block font-mono text-[15px] font-semibold tracking-[0.12em] text-gold uppercase">
                        {notFound.eyebrow}
                    </span>

                    <h1 className="font-display mt-4 text-[clamp(1.875rem,4.2vw,3rem)] leading-[1.08] font-semibold tracking-tight text-white">
                        {notFound.headline}
                    </h1>

                    <p className="mx-auto mt-5 max-w-[520px] text-[17px] text-white/78">
                        {notFound.description}
                    </p>

                    <p className="mx-auto mt-3 max-w-[520px] font-mono text-[13px] text-white/45 break-all">
                        Requested path:{' '}
                        <span className="text-white/70">{pathname}</span>
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                        <Button variant="gold" link={notFound.primary} />
                        <Button variant="ghost" link={notFound.secondary} />
                    </div>

                    <nav
                        aria-label={notFound.helpfulHeading}
                        className="mt-12 border-t border-white/10 pt-8"
                    >
                        <p className="font-mono text-[12px] font-semibold tracking-[0.12em] text-white/45 uppercase">
                            {notFound.helpfulHeading}
                        </p>
                        <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3">
                            {notFound.helpfulLinks.map((link) => (
                                <li key={link.to}>
                                    <SiteLink
                                        link={link}
                                        className="text-[15px] font-medium text-white/78 transition-colors hover:text-gold-soft focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-soft"
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Reveal>
            </div>
        </main>
    )
}
