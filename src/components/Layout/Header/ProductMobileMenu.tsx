import { Link } from '@tanstack/react-router'
import { productMenuLinks } from '@/data/product-menu'

const ChevronDown = ({ open }: { open: boolean }) => {
    return (
        <svg
            width="8"
            height="7"
            viewBox="0 0 8 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
        >
            <path
                d="M3.246 6.42373C3.20733 6.38605 3.042 6.24374 2.906 6.11119C2.05067 5.33405 0.650667 3.30673 0.223333 2.24564C0.154667 2.0845 0.00933333 1.67708 0 1.45941C0 1.25083 0.048 1.052 0.145333 0.862259C0.281333 0.625739 0.495333 0.436003 0.748 0.332038C0.923333 0.265111 1.448 0.161146 1.45733 0.161146C2.03133 0.0571807 2.964 0 3.99467 0C4.97667 0 5.87133 0.0571807 6.454 0.142302C6.46333 0.152049 7.11533 0.256014 7.33867 0.369725C7.74667 0.578305 8 0.985717 8 1.42172V1.45941C7.99 1.74336 7.73667 2.34051 7.72733 2.34051C7.29933 3.34442 5.968 5.32495 5.08333 6.12093C5.08333 6.12093 4.856 6.34511 4.714 6.44258C4.51 6.59463 4.25733 6.67 4.00467 6.67C3.72267 6.67 3.46 6.58488 3.246 6.42373Z"
                fill="currentColor"
            />
        </svg>
    )
}

type ProductMobileMenuProps = {
    open: boolean
    onToggle: () => void
    onNavigate?: () => void
}

export const ProductMobileMenu = ({
    open,
    onToggle,
    onNavigate,
}: ProductMobileMenuProps) => (
    <div>
        <button
            type="button"
            className="flex w-full items-center justify-between bg-transparent p-0 text-[14.5px] font-medium text-white/86"
            aria-expanded={open}
            onClick={onToggle}
        >
            Product
            <ChevronDown open={open} />
        </button>

        {open && (
            <div className="mt-2 flex flex-col gap-2 border-l border-white/10 pl-4">
                {productMenuLinks.map((link) => (
                    <Link
                        key={link.id}
                        to={link.to}
                        className="text-sm font-medium text-white/86 hover:text-gold-soft"
                        onClick={onNavigate}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        )}
    </div>
)
