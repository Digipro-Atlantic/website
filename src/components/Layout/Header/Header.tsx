import { useState } from 'react'
import menuIcon from '@/assets/icons/menu.svg'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { SiteLink } from '@/components/SiteLink'
import { headerNav, navCtas } from '@/data/nav'
import { MobileMenu } from './MobileMenu'
import { ctaClass } from './styles'

const navLinkClass =
    'text-body text-grey-900 transition-colors duration-150 ease-[ease] hover:text-primary-400 data-[status=active]:text-primary-400 xl:text-body-lg'

const signInClass =
    'text-body text-primary-900 transition-colors duration-150 ease-[ease] hover:text-primary-400 xl:text-body-lg'

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <header className="sticky top-0 z-40 bg-white">
                <Container className="flex h-24 items-center justify-between md:h-37.5">
                    <Logo className="h-10 md:h-12" />

                    {/* Spacers reproduce Figma's uneven gaps around the links (tablet 48/94, desktop 96/255) and shrink in proportion. */}
                    <span
                        aria-hidden="true"
                        className="hidden min-w-6 md:block md:flex-48 xl:flex-96"
                    />
                    <nav
                        aria-label="Main"
                        className="hidden shrink-0 items-center gap-6 md:flex"
                    >
                        {headerNav.map((link) => (
                            <SiteLink
                                key={link.to}
                                link={link}
                                className={navLinkClass}
                            />
                        ))}
                    </nav>
                    <span
                        aria-hidden="true"
                        className="hidden min-w-6 md:block md:flex-94 xl:flex-255"
                    />

                    <div className="hidden shrink-0 items-center gap-4 md:flex xl:gap-7.5">
                        <SiteLink
                            link={navCtas.signIn}
                            className={signInClass}
                        />
                        <SiteLink
                            link={navCtas.bookDemo}
                            className={`${ctaClass} h-12 w-32 text-body xl:h-14 xl:w-45 xl:text-body-lg`}
                        />
                    </div>

                    <button
                        type="button"
                        className="-m-2 inline-flex p-2 md:hidden"
                        aria-label="Open menu"
                        aria-haspopup="dialog"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(true)}
                    >
                        <img src={menuIcon} alt="" width={32} height={32} />
                    </button>
                </Container>
            </header>

            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    )
}
