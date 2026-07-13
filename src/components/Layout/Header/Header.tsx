import { useState } from 'react'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { SiteLink } from '@/components/SiteLink'
import { headerNav, navCtas } from '@/data/nav'
import { ProductDropdown } from './ProductDropdown'
import { ProductMobileMenu } from './ProductMobileMenu'

const menuToggleClass =
    'inline-flex min-[981px]:hidden items-center justify-center rounded-md border-2 border-white/20 bg-white p-2 text-teal-950 transition hover:bg-teal-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950'

const mobileLinkClass = 'text-sm font-medium text-white/86 hover:text-gold-soft'

export const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [productOpen, setProductOpen] = useState(false)
    const closeMobile = () => setMobileOpen(false)

    return (
        <header>
            <div className="wrap nav">
                <Logo variant="ongreen" />

                <nav className="nav-links" aria-label="Main">
                    <ProductDropdown />
                    {headerNav.map((link) => (
                        <SiteLink
                            key={link.to}
                            link={link}
                            activeClassName="active"
                        />
                    ))}
                </nav>

                <div className="nav-cta">
                    <Button
                        variant="ghost"
                        link={navCtas.signIn}
                        className="hidden min-[981px]:inline-flex"
                    />
                    <Button
                        variant="gold"
                        link={navCtas.bookDemo}
                        className="hidden min-[981px]:inline-flex"
                    />

                    <button
                        type="button"
                        className={menuToggleClass}
                        aria-controls="mobile-menu"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((open) => !open)}
                    >
                        <span className="sr-only">
                            {mobileOpen ? 'Close main menu' : 'Open main menu'}
                        </span>
                        {!mobileOpen ? (
                            <svg
                                className="block size-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="block size-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <nav
                    id="mobile-menu"
                    className="flex flex-col gap-3.5 border-t border-white/8 bg-teal-950 px-7 pt-4 pb-5 min-[981px]:hidden"
                    aria-label="Mobile"
                >
                    <ProductMobileMenu
                        open={productOpen}
                        onToggle={() => setProductOpen((open) => !open)}
                        onNavigate={closeMobile}
                    />

                    {headerNav.map((link) => (
                        <SiteLink
                            key={link.to}
                            link={link}
                            className={mobileLinkClass}
                            onClick={closeMobile}
                        />
                    ))}

                    <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">
                        <Button
                            variant="ghost"
                            link={navCtas.signIn}
                            className="justify-center"
                            onClick={closeMobile}
                        />
                        <Button
                            variant="gold"
                            link={navCtas.bookDemo}
                            className="justify-center"
                            onClick={closeMobile}
                        />
                    </div>
                </nav>
            )}
        </header>
    )
}
