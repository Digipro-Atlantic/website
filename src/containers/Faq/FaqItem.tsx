import { ChevronDown } from 'lucide-react'

type FaqItemProps = {
    id: string
    question: string
    answer: string
    open: boolean
    /** Called with the clicked button so the page can keep it still while another answer closes. */
    onToggle: (button: HTMLButtonElement) => void
}

/** One question in the FAQ. Controlled by FaqSections, which keeps a single answer open at a time. */
export const FaqItem = ({
    id,
    question,
    answer,
    open,
    onToggle,
}: FaqItemProps) => (
    <div className="border border-grey-300 bg-white">
        <h3>
            <button
                type="button"
                id={`${id}-button`}
                aria-expanded={open}
                aria-controls={`${id}-panel`}
                onClick={(event) => onToggle(event.currentTarget)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5.5 text-left text-body-lg font-semibold text-grey-900 md:min-h-17.5 md:px-8 md:py-0 md:text-h6 xl:min-h-19.5 xl:text-h5"
            >
                {question}
                <ChevronDown
                    aria-hidden="true"
                    className={`size-4 shrink-0 transition-transform duration-200 ease-out motion-reduce:transition-none md:size-6 ${open ? 'rotate-180' : ''}`}
                />
            </button>
        </h3>
        {/* Always mounted so the row height can animate (0fr to 1fr); inert and hidden while closed.
            Opens in 250ms, closes a touch faster (200ms): closing is "done reading, next". */}
        <div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            inert={!open}
            className={`grid transition-[grid-template-rows,visibility] ease-out motion-reduce:transition-none ${open ? 'visible grid-rows-[1fr] duration-250' : 'invisible grid-rows-[0fr] duration-200'}`}
        >
            <div className="overflow-hidden">
                {/* The answer trails the height by 60ms and rises 4px, so text never shows before there is room for it. */}
                <p
                    className={`px-6 pb-6 text-body text-grey-600 transition-[opacity,translate] ease-out motion-reduce:translate-y-0 motion-reduce:transition-none md:px-8 xl:pb-8 ${open ? 'translate-y-0 opacity-100 delay-60 duration-200' : 'translate-y-1 opacity-0 duration-150'}`}
                >
                    {answer}
                </p>
            </div>
        </div>
    </div>
)
