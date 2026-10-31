import { useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { SiteLink } from '@/components/SiteLink'
import { headerNav, navCtas } from '@/data/nav'
import { ctaClass } from './styles'

type MobileMenuProps = {
    open: boolean
    onClose: () => void
}

const linkClass =
    'block border-b border-border py-4 text-body-lg text-grey-900 transition-colors duration-150 ease-[ease] hover:text-primary-400 data-[status=active]:text-primary-400'

// No mobile-menu frame exists in Figma; this follows the header's type and colour.
export const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
    // The full nav takes over at md, so don't leave a hidden dialog holding scroll lock.
    useEffect(() => {
        if (!open) return
        const desktop = window.matchMedia('(min-width: 64rem)')
        const close = (event: MediaQueryListEvent) => {
            if (event.matches) onClose()
        }
        desktop.addEventListener('change', close)
        return () => desktop.removeEventListener('change', close)
    }, [open, onClose])

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-grey-900/40 transition-opacity duration-400 ease-out data-closed:opacity-0"
            />

            <div className="fixed inset-0 flex justify-end">
                <DialogPanel
                    transition
                    className="flex h-full w-full max-w-sm flex-col bg-white px-4 pb-8 shadow-4xl duration-400 ease-drawer motion-safe:transition-transform motion-safe:data-closed:translate-x-full motion-reduce:transition-opacity motion-reduce:data-closed:opacity-0 sm:px-10"
                >
                    <div className="flex h-24 shrink-0 items-center justify-between">
                        <Logo className="h-10" onClick={onClose} />
                        <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-grey-900"
                            aria-label="Close menu"
                            onClick={onClose}
                        >
                            <X className="size-8" aria-hidden="true" />
                        </button>
                    </div>

                    <nav aria-label="Main" className="mt-4">
                        {headerNav.map((link) => (
                            <SiteLink
                                key={link.to}
                                link={link}
                                className={linkClass}
                                onClick={onClose}
                            />
                        ))}
                    </nav>

                    <div className="mt-auto flex flex-col gap-3 pt-8">
                        <SiteLink
                            link={navCtas.signIn}
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-border-strong text-body text-primary-900"
                            onClick={onClose}
                        />
                        <SiteLink
                            link={navCtas.bookDemo}
                            className={`${ctaClass} h-12 text-body`}
                            onClick={onClose}
                        />
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
