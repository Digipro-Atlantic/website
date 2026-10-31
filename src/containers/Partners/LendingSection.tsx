import { useReducedMotion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { Container } from '@/components/Container'
import { partners } from '@/data/partners'
import { LendingIllustration } from './LendingIllustration'
import { SectionHeading } from './SectionHeading'

const CheckCircle = ({
    className = '',
    delayMs = 0,
}: {
    className?: string
    delayMs?: number
}) => (
    <svg
        aria-hidden="true"
        style={{ transitionDelay: `${delayMs}ms` }}
        viewBox="0 0 24 24"
        className={`mt-0.5 size-5 shrink-0 text-primary-400 xl:mt-px xl:size-6 ${className}`}
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

const enter = 'transition-[opacity,translate] duration-700 ease-out'
const settled = 'translate-x-0 translate-y-0 opacity-100'

/**
 * Figma "Parralax3": the heading drops in, the photo slides in from the left
 * and draws its line (see LendingIllustration), the text arrives from the
 * right a beat later and its ticks pop one by one. Reduced motion fades.
 */
export const LendingSection = () => {
    const reduce = useReducedMotion()
    const heading = useInView({
        triggerOnce: true,
        rootMargin: '0px 0px -15% 0px',
    })
    const body = useInView({
        triggerOnce: true,
        rootMargin: '0px 0px -20% 0px',
    })
    const from = (offset: string) =>
        reduce ? 'opacity-0' : `opacity-0 ${offset}`

    return (
        <Container className="mt-20 overflow-x-clip md:mt-24 xl:mt-36">
            <div
                ref={heading.ref}
                className={`${enter} ${heading.inView ? settled : from('-translate-y-10')}`}
            >
                <SectionHeading
                    label={lending.label}
                    title={lending.title}
                    description={lending.description}
                />
            </div>

            <div
                ref={body.ref}
                className="mt-12 grid items-center gap-14 md:mt-18 md:grid-cols-2 md:gap-10 xl:mt-31.5"
            >
                <div
                    className={`xl:-ml-5 ${enter} ${body.inView ? settled : from('-translate-x-10')}`}
                >
                    <LendingIllustration play={body.inView} />
                </div>

                <div
                    className={`w-full max-w-145 delay-150 md:justify-self-end ${enter} ${body.inView ? settled : from('translate-x-10')}`}
                >
                    <h3 className="px-2 text-body-lg font-semibold text-grey-900 md:px-0 xl:text-h6">
                        {lending.blockTitle}
                    </h3>
                    <p className="mt-6 px-2 text-body text-grey-700 md:px-0 md:text-body-sm xl:text-body-lg">
                        {lending.blockText}
                    </p>
                    <ul className="mt-6 flex flex-col gap-4 px-2 md:px-0">
                        {lending.checklist.map((item, index) => (
                            <li
                                key={item}
                                className="flex items-start gap-4 text-body text-grey-700 md:gap-3 md:text-body-sm xl:gap-4 xl:text-body-lg"
                            >
                                {/* Ticks pop in turn once the text has arrived. */}
                                <CheckCircle
                                    delayMs={600 + index * 60}
                                    className={`transition-[opacity,scale] duration-300 ease-out ${
                                        body.inView || reduce
                                            ? 'scale-100 opacity-100'
                                            : `opacity-0 ${reduce ? '' : 'scale-60'}`
                                    }`}
                                />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Container>
    )
}
