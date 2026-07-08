import { useState } from 'react'
import { Logo } from '@/components/Logo'
import { SiteLink } from '@/components/SiteLink'
import { navCtas, primaryNav } from '@/data/nav'

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header>
            <div className="wrap nav">
                <Logo />
                <nav className="nav-links" aria-label="Main">
                    {primaryNav.map((link) => (
                        <SiteLink
                            key={link.to}
                            link={link}
                            activeClassName="active"
                        />
                    ))}
                </nav>
                <div className="nav-cta">
                    <SiteLink link={navCtas.signIn} className="btn btn-ghost" />
                    <SiteLink
                        link={navCtas.bookDemo}
                        className="btn btn-gold"
                    />
                    <button
                        type="button"
                        className="menu-toggle"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                        >
                            <line x1="3" y1="7" x2="21" y2="7" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="17" x2="21" y2="17" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                {primaryNav.map((link) => (
                    <SiteLink
                        key={`mobile-${link.to}`}
                        link={link}
                        activeClassName="active"
                        onClick={() => setMenuOpen(false)}
                    />
                ))}
                <SiteLink link={navCtas.bookDemo} className="btn btn-gold" />
            </div>
        </header>
    )
}
