import { Fragment, useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react'
import { productMenu, type ProductMenuProductId } from '@/data/product-menu'
import type {
    ProductMenuFooterLink,
    ProductMenuItem,
    ProductMenuSolution,
} from '@/data/types'
import { ProductMenuIcon } from './ProductMenuIcon'

const ChevronDown = ({ open }: { open: boolean }) => {
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

const ChevronRight = () => {
    return (
        <svg
            className="size-3.5 shrink-0 text-ink-soft"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.29a.75.75 0 111.04-1.08l4.25 4.5a.75.75 0 010 1.08l-4.25 4.5a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
            />
        </svg>
    )
}

const SolutionLink = ({
    solution,
    onNavigate,
}: {
    solution: ProductMenuSolution
    onNavigate?: () => void
}) => {
    const className =
        'group block rounded-lg px-3 py-3 transition-colors hover:bg-teal-100/60'

    const content = (
        <>
            <span className="block text-[15px] font-semibold text-ink group-hover:text-teal-700">
                {solution.label}
            </span>
            <span className="mt-1 block text-sm leading-snug text-ink-soft">
                {solution.description}
            </span>
        </>
    )

    if (solution.external) {
        return (
            <a
                href={solution.to}
                className={className}
                onClick={onNavigate}
                target={solution.to.startsWith('http') ? '_blank' : undefined}
                rel={
                    solution.to.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                }
            >
                {content}
            </a>
        )
    }

    return (
        <Link to={solution.to} className={className} onClick={onNavigate}>
            {content}
        </Link>
    )
}

const FooterLink = ({
    link,
    onNavigate,
}: {
    link: ProductMenuFooterLink
    onNavigate?: () => void
}) => {
    const className =
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white/70'

    const content = (
        <>
            <ProductMenuIcon icon={link.icon} className="size-8 rounded-md" />
            <span>{link.label}</span>
        </>
    )

    if (link.external) {
        return (
            <a
                href={link.to}
                className={className}
                onClick={onNavigate}
                target={link.to.startsWith('http') ? '_blank' : undefined}
                rel={
                    link.to.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                }
            >
                {content}
            </a>
        )
    }

    return (
        <Link to={link.to} className={className} onClick={onNavigate}>
            {content}
        </Link>
    )
}

const ProductRow = ({
    product,
    active,
    onHover,
}: {
    product: ProductMenuItem
    active: boolean
    onHover: () => void
}) => {
    return (
        <button
            type="button"
            className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                active ? 'bg-white shadow-sm' : 'hover:bg-white/60'
            }`}
            onMouseEnter={onHover}
            onFocus={onHover}
        >
            <ProductMenuIcon icon={product.icon} />
            <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                    <span className="text-[15px] font-semibold text-ink">
                        {product.label}
                    </span>
                    <ChevronRight />
                </span>
                <span className="mt-1 block text-sm leading-snug text-ink-soft">
                    {product.description}
                </span>
            </span>
        </button>
    )
}

const SolutionsPanel = ({
    product,
    onNavigate,
}: {
    product: ProductMenuItem
    onNavigate?: () => void
}) => {
    return (
        <div className="flex min-h-full flex-col p-5">
            <Link
                to={product.to}
                className="mb-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink transition-colors hover:text-teal-700"
                onClick={onNavigate}
            >
                {product.label}
                <ChevronRight />
            </Link>

            <div className="flex flex-col gap-1">
                {product.solutions.map((solution) => (
                    <SolutionLink
                        key={solution.id}
                        solution={solution}
                        onNavigate={onNavigate}
                    />
                ))}
            </div>

            <Link
                to={product.to}
                className="mt-auto pt-5 text-sm font-semibold text-teal-700 transition-colors hover:text-teal-600"
                onClick={onNavigate}
            >
                More about {product.label}
            </Link>
        </div>
    )
}

type ProductDropdownProps = {
    onNavigate?: () => void
}

export const ProductDropdown = ({ onNavigate }: ProductDropdownProps) => {
    const defaultProductId = productMenu.products[0].id
    const [activeProductId, setActiveProductId] =
        useState<ProductMenuProductId>(defaultProductId)

    const activeProduct =
        productMenu.products.find(
            (product) => product.id === activeProductId,
        ) ?? productMenu.products[0]

    return (
        <Menu as="span" className="relative">
            {({ open }) => (
                <ProductDropdownInner
                    open={open}
                    activeProduct={activeProduct}
                    activeProductId={activeProductId}
                    defaultProductId={defaultProductId}
                    onNavigate={onNavigate}
                    setActiveProductId={setActiveProductId}
                />
            )}
        </Menu>
    )
}

const ProductDropdownInner = ({
    open,
    activeProduct,
    activeProductId,
    defaultProductId,
    onNavigate,
    setActiveProductId,
}: {
    open: boolean
    activeProduct: ProductMenuItem
    activeProductId: ProductMenuProductId
    defaultProductId: ProductMenuProductId
    onNavigate?: () => void
    setActiveProductId: (id: ProductMenuProductId) => void
}) => {
    useEffect(() => {
        if (open) {
            setActiveProductId(defaultProductId)
        }
    }, [open, defaultProductId, setActiveProductId])

    return (
        <>
            <MenuButton
                className={
                    open ? 'is-open flex items-center' : 'flex items-center'
                }
            >
                Product
                <ChevronDown open={open} />
            </MenuButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <MenuItems
                    modal={false}
                    className="absolute top-full left-0 z-50 mt-3 w-[min(720px,calc(100vw-3.5rem))] origin-top-left overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl focus:outline-none"
                >
                    <div className="grid grid-cols-[minmax(260px,300px)_1fr]">
                        <div className="border-r border-line bg-teal-100/35 p-3">
                            <div className="flex flex-col gap-1">
                                {productMenu.products.map((product) => (
                                    <ProductRow
                                        key={product.id}
                                        product={product}
                                        active={activeProductId === product.id}
                                        onHover={() =>
                                            setActiveProductId(product.id)
                                        }
                                    />
                                ))}
                            </div>

                            {productMenu.footerLinks.length > 0 && (
                                <>
                                    <div className="my-3 border-t border-line" />
                                    <div className="flex flex-col gap-0.5">
                                        {productMenu.footerLinks.map((link) => (
                                            <FooterLink
                                                key={link.id}
                                                link={link}
                                                onNavigate={onNavigate}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <SolutionsPanel
                            product={activeProduct}
                            onNavigate={onNavigate}
                        />
                    </div>
                </MenuItems>
            </Transition>
        </>
    )
}
