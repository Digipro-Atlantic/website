import { useId } from 'react'
import { MotionConfig, motion } from 'motion/react'
import { billingOptions } from '@/data/pricing'
import type { BillingPeriod } from '@/data/pricing'

type BillingToggleProps = {
    value: BillingPeriod
    onChange: (value: BillingPeriod) => void
    /** Smaller track without the "+ 2 Month" chip, used inside the comparison table. */
    compact?: boolean
    className?: string
}

/** Monthly / Annual segmented control. The white pill glides between options (reduced motion: instant). */
export const BillingToggle = ({
    value,
    onChange,
    compact = false,
    className = '',
}: BillingToggleProps) => {
    const pillId = useId()

    return (
        <MotionConfig reducedMotion="user">
            <div
                role="group"
                aria-label="Billing period"
                className={`flex rounded-full border border-grey-200 bg-white p-1.5 ${compact ? 'h-14 w-63.5 md:h-10 md:w-45 xl:h-14 xl:w-63.5' : 'h-16 w-full max-w-84'} ${className}`}
            >
                {billingOptions.map((option) => {
                    const active = option.id === value

                    return (
                        <button
                            key={option.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => onChange(option.id)}
                            className={`relative flex cursor-pointer items-center justify-center gap-2.5 rounded-full text-body font-medium transition-colors duration-150 ${compact ? 'md:text-body-sm xl:text-body' : ''} ${option.id === 'monthly' ? `shrink-0 ${compact ? 'w-30 md:w-21 xl:w-30' : 'w-30'}` : 'min-w-0 flex-1'} ${active ? 'text-grey-800' : 'text-grey-700 hover:text-grey-900'}`}
                        >
                            {active && (
                                <motion.span
                                    layoutId={pillId}
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-full bg-grey-100 shadow-xs"
                                    transition={{
                                        duration: 0.18,
                                        ease: 'easeOut',
                                    }}
                                />
                            )}
                            <span className="relative">{option.label}</span>
                            {!compact && 'chip' in option && (
                                <span className="relative rounded-full bg-grey-200 px-2.5 py-1 text-body font-normal whitespace-nowrap text-grey-700">
                                    {option.chip}
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>
        </MotionConfig>
    )
}
