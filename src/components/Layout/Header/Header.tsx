import { Fragment, useState } from 'react'
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import { Logo } from '@/components/Logo'
import { SiteLink } from '@/components/SiteLink'
import { headerNav, navCtas } from '@/data/nav'

const menuToggleClass =
    'inline-flex min-[981px]:hidden items-center justify-center rounded-md border-2 border-white/20 bg-white p-2 text-teal-950 transition hover:bg-teal-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950'

function Chevron({ open }: { open: boolean }) {
    return (
        <svg
            width="8"
            height="7"
            viewBox="0 0 8 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`ml-2 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
        >
            <path
                d="M3.246 6.42373C3.20733 6.38605 3.042 6.24374 2.906 6.11119C2.05067 5.33405 0.650667 3.30673 0.223333 2.24564C0.154667 2.0845 0.00933333 1.67708 0 1.45941C0 1.25083 0.048 1.052 0.145333 0.862259C0.281333 0.625739 0.495333 0.436003 0.748 0.332038C0.923333 0.265111 1.448 0.161146 1.45733 0.161146C2.03133 0.0571807 2.964 0 3.99467 0C4.97667 0 5.87133 0.0571807 6.454 0.142302C6.46333 0.152049 7.11533 0.256014 7.33867 0.369725C7.74667 0.578305 8 0.985717 8 1.42172V1.45941C7.99 1.74336 7.73667 2.34051 7.72733 2.34051C7.29933 3.34442 5.968 5.32495 5.08333 6.12093C5.08333 6.12093 4.856 6.34511 4.714 6.44258C4.51 6.59463 4.25733 6.67 4.00467 6.67C3.72267 6.67 3.46 6.58488 3.246 6.42373Z"
                fill="currentColor"
            />
        </svg>
    )
}

function ProductDropdown({ onNavigate }: { onNavigate?: () => void }) {
    return (
        <Menu as="span" className="relative">
            {({ open }) => (
                <>
                    <MenuButton className={open ? 'is-open' : undefined}>
                        Product
                        <Chevron open={open} />
                    </MenuButton>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <MenuItems className="absolute top-full left-0 z-50 mt-3 w-56 origin-top-left rounded-lg border border-white/10 bg-teal-950 py-2 shadow-xl focus:outline-none">
                            {headerNav.product.map((link) => (
                                <MenuItem key={link.to}>
                                    {({ focus }) => (
                                        <SiteLink
                                            link={link}
                                            onClick={onNavigate}
                                            className={`block px-4 py-2.5 text-sm text-white/82 transition-colors ${
                                                focus
                                                    ? 'bg-white/5 text-gold-soft'
                                                    : 'hover:text-gold-soft'
                                            }`}
                                        />
                                    )}
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Transition>
                </>
            )}
        </Menu>
    )
}

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
                    <SiteLink
                        link={headerNav.pricing}
                        activeClassName="active"
                    />
                    <SiteLink link={headerNav.faq} activeClassName="active" />
                </nav>

                <div className="nav-cta">
                    <SiteLink
                        link={navCtas.signIn}
                        className="btn btn-ghost hidden min-[981px]:inline-flex"
                    />
                    <SiteLink
                        link={navCtas.bookDemo}
                        className="btn btn-gold hidden min-[981px]:inline-flex"
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
                    <button
                        type="button"
                        className="flex w-full items-center justify-between bg-transparent p-0 text-[14.5px] font-medium text-white/86"
                        aria-expanded={productOpen}
                        onClick={() => setProductOpen((open) => !open)}
                    >
                        Product
                        <Chevron open={productOpen} />
                    </button>

                    {productOpen && (
                        <div className="mb-1 flex flex-col gap-2 border-l border-white/10 pl-4">
                            {headerNav.product.map((link) => (
                                <SiteLink
                                    key={link.to}
                                    link={link}
                                    className="text-sm text-white/70 hover:text-gold-soft"
                                    onClick={closeMobile}
                                />
                            ))}
                        </div>
                    )}

                    <SiteLink
                        link={headerNav.pricing}
                        className="text-sm font-medium text-white/86 hover:text-gold-soft"
                        onClick={closeMobile}
                    />
                    <SiteLink
                        link={headerNav.faq}
                        className="text-sm font-medium text-white/86 hover:text-gold-soft"
                        onClick={closeMobile}
                    />

                    <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">
                        <SiteLink
                            link={navCtas.signIn}
                            className="btn btn-ghost justify-center"
                            onClick={closeMobile}
                        />
                        <SiteLink
                            link={navCtas.bookDemo}
                            className="btn btn-gold justify-center"
                            onClick={closeMobile}
                        />
                    </div>
                </nav>
            )}
        </header>
    )
}
