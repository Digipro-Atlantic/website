import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { SiteLink } from '@/components/SiteLink'
import { footerNav } from '@/data/nav'
import { site } from '@/data/site'
import type { NavLink } from '@/data/types'
import { NewsletterForm } from './NewsletterForm'

const columns: { id: string; title: string; links: readonly NavLink[] }[] = [
    { id: 'platform', title: 'Platform', links: footerNav.platform },
    { id: 'company', title: 'Company', links: footerNav.company },
    { id: 'legal', title: 'Legal', links: footerNav.legal },
]

const linkClass =
    'text-body font-medium text-grey-500 transition-colors duration-150 ease-[ease] hover:text-primary-400'

export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="border-t border-border-strong bg-white">
            <Container className="flex flex-col gap-16 py-16">
                <div className="flex flex-col gap-20 md:flex-row md:gap-8">
                    <div className="flex flex-col gap-8 md:w-90 md:shrink-0 lg:w-106">
                        <Logo className="h-8" />
                        <NewsletterForm />
                    </div>

                    <div className="grid gap-20 sm:grid-cols-3 sm:gap-8 md:flex-1">
                        {columns.map((column) => (
                            <nav
                                key={column.id}
                                aria-labelledby={`footer-${column.id}`}
                                className="flex flex-col gap-6"
                            >
                                <h2
                                    id={`footer-${column.id}`}
                                    className="text-body text-grey-400 uppercase"
                                >
                                    {column.title}
                                </h2>
                                <ul className="flex flex-col gap-4">
                                    {column.links.map((link) =>
                                        link.hide ? null : (
                                            <li key={link.label}>
                                                <SiteLink
                                                    link={link}
                                                    className={linkClass}
                                                />
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </nav>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 border-t border-border pt-8 text-body-sm sm:flex-row sm:justify-between">
                    <p className="font-medium text-grey-500">
                        {site.footerLine}
                    </p>
                    <p className="text-grey-400">
                        &copy; {year} {site.legalName}. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    )
}
