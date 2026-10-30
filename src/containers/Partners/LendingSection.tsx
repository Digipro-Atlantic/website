import { Coins } from 'lucide-react'
import loanApplicant from '@/assets/partners/loan-applicant.webp'
import paperPlane from '@/assets/partners/paper-plane.webp'
import { Container } from '@/components/Container'
import { Reveal } from '@/components/Reveal'
import { partners } from '@/data/partners'
import { SectionHeading } from './SectionHeading'

const CheckCircle = () => (
    <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="mt-0.5 size-5 shrink-0 text-primary-400"
        fill="currentColor"
    >
        <path d="M15.6754 10.7375C16.0827 10.3644 16.1105 9.73188 15.7375 9.3246C15.3644 8.91732 14.7319 8.88954 14.3246 9.26255L10.6325 12.644L9.6754 11.7674C9.26812 11.3944 8.63557 11.4221 8.26255 11.8294C7.88954 12.2367 7.91732 12.8693 8.3246 13.2423L9.95712 14.7374C10.3393 15.0875 10.9257 15.0875 11.3079 14.7374L15.6754 10.7375Z" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
        />
    </svg>
)

const { lending } = partners

export const LendingSection = () => (
    <Container className="mt-22 md:mt-25 xl:mt-37">
        <SectionHeading
            label={lending.label}
            title={lending.title}
            description={lending.description}
        />

        <div className="mt-11 grid items-center gap-10 md:mt-22 md:grid-cols-2 xl:mt-30">
            <Reveal className="relative aspect-[642/611] w-full max-w-160.5 xl:-ml-5">
                <img
                    src={paperPlane}
                    alt=""
                    aria-hidden="true"
                    width={642}
                    height={325}
                    loading="lazy"
                    className="absolute top-0 left-0 w-full"
                />
                <img
                    src={loanApplicant}
                    alt=""
                    aria-hidden="true"
                    width={960}
                    height={1110}
                    loading="lazy"
                    className="absolute bottom-0 left-0 w-[74.8%]"
                />
                <div
                    aria-hidden="true"
                    className="absolute top-[20.3%] right-[1.6%] flex items-center gap-2.5 rounded-2xl border border-[#E2FCF4] bg-white py-3 pr-4 pl-3 shadow-[0_4px_24px_rgb(16_25_40/0.08)] xl:gap-3.5 xl:py-5 xl:pr-6 xl:pl-5"
                >
                    <span className="flex size-8 items-center justify-center rounded-lg bg-[#E2FCF4] text-primary-400 xl:size-10.5">
                        <Coins
                            className="size-5 xl:size-6"
                            strokeWidth={1.75}
                        />
                    </span>
                    <span className="flex flex-col whitespace-nowrap">
                        <span className="text-caption text-grey-600 xl:text-body-sm">
                            {lending.loanLabel}
                        </span>
                        <span className="text-body font-semibold text-black xl:text-h4 xl:tracking-[-0.02em]">
                            {lending.loanAmount}
                        </span>
                    </span>
                </div>
            </Reveal>

            <Reveal className="w-full max-w-145 md:justify-self-end">
                <h3 className="px-2 text-body-lg font-semibold text-grey-900 md:px-0 xl:text-h6">
                    {lending.blockTitle}
                </h3>
                <p className="mt-5 px-2 text-body text-grey-700 md:mt-4 md:px-0 md:text-body-sm xl:text-body-lg">
                    {lending.blockText}
                </p>
                <ul className="mt-6 flex flex-col gap-4 px-2 md:px-0 xl:mt-8 xl:gap-5">
                    {lending.checklist.map((item) => (
                        <li
                            key={item}
                            className="flex items-start gap-4 text-body text-grey-700 md:gap-3 md:text-body-sm xl:text-body-lg"
                        >
                            <CheckCircle />
                            {item}
                        </li>
                    ))}
                </ul>
            </Reveal>
        </div>
    </Container>
)
