import { Logo } from '@/components/Logo'

type AppSidebarProps = {
    links: readonly string[]
    active: string
}

export const AppSidebar = ({ links, active }: AppSidebarProps) => (
    <aside className="flex w-[146px] shrink-0 flex-col gap-0.5 bg-teal-900 p-3 px-3 pt-4">
        <div className="mb-3">
            <Logo variant="white" size="ui" to={false} />
        </div>
        {links.map((link) => (
            <span
                key={link}
                className={`rounded-[7px] px-2 py-1.5 text-xs ${
                    link === active
                        ? 'bg-white/13 font-semibold text-white'
                        : 'text-white/72'
                }`}
            >
                {link}
            </span>
        ))}
    </aside>
)
