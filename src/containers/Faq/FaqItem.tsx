import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'
import { ChevronDown } from 'lucide-react'

type FaqItemProps = {
    question: string
    answer: string
    defaultOpen?: boolean
}

export const FaqItem = ({
    question,
    answer,
    defaultOpen = false,
}: FaqItemProps) => (
    <Disclosure
        as="div"
        defaultOpen={defaultOpen}
        className="border border-grey-300 bg-white"
    >
        {({ open }) => (
            <>
                <h3>
                    <DisclosureButton className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5.5 text-left text-body-lg font-semibold text-grey-900 md:px-8 md:text-h6 xl:py-6 xl:text-h5">
                        {question}
                        <ChevronDown
                            aria-hidden="true"
                            className={`size-5 shrink-0 transition-transform duration-200 ease-out motion-reduce:transition-none xl:size-6 ${open ? 'rotate-180' : ''}`}
                        />
                    </DisclosureButton>
                </h3>
                {/* Always mounted so the row height can animate (0fr to 1fr); hidden from AT and tab order while closed. */}
                <DisclosurePanel
                    static
                    className={`grid transition-[grid-template-rows,visibility] duration-250 ease-out motion-reduce:transition-none ${open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'}`}
                >
                    <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-body text-grey-600 md:px-8 xl:pb-8">
                            {answer}
                        </p>
                    </div>
                </DisclosurePanel>
            </>
        )}
    </Disclosure>
)
