import { Check } from 'lucide-react'
import { SiteLink } from '@/components/SiteLink'
import { getTierPrice, pricingTiers } from '@/data/pricing'
import type { BillingPeriod, PricingTier } from '@/data/pricing'
import { AnimatedPrice, swapIn } from './AnimatedPrice'

const MostChosenBadge = ({ className = '' }: { className?: string }) => (
    <span
        className={`rounded-full bg-primary-400 px-3 py-0.5 text-caption text-white xl:text-body-sm ${className}`}
    >
        Most Chosen
    </span>
)

// Hovering a plan raises it to Pro's shadow: no colour, no movement, so Pro
// stays the one highlighted plan. Tailwind's hover: only fires on devices
// with a real hover, so taps never leave a card stuck lifted.
const quietLift =
    'transition-shadow duration-200 ease-[ease] hover:shadow-[0_20px_24px_-4px_rgb(0_0_0/0.1),0_8px_8px_-4px_rgb(0_0_0/0.04)]'

const TierCard = ({
    tier,
    period,
}: {
    tier: PricingTier
    period: BillingPeriod
}) => {
    const price = getTierPrice(tier, period)

    return (
        <li className="rounded-2xl bg-grey-50 p-2.5 shadow-[0_1.5px_4px_-1px_rgb(16_25_40/0.07)] sm:p-2 md:p-1.5 xl:p-2">
            <article
                aria-labelledby={`tier-${tier.id}`}
                className={`flex h-full flex-col rounded-2xl bg-white p-10 sm:p-5 xl:p-8 ${tier.featured ? 'border-[1.5px] border-primary-400 shadow-[0_20px_24px_-4px_rgb(0_0_0/0.1),0_8px_8px_-4px_rgb(0_0_0/0.04)]' : `border border-grey-200 shadow-[0_3px_2px_-2px_rgb(0_0_0/0.06),0_5px_3px_-2px_rgb(0_0_0/0.02)] ${quietLift}`}`}
            >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                    <h3
                        id={`tier-${tier.id}`}
                        className="text-h3 font-semibold tracking-tight text-grey-900 sm:text-h5 md:text-h6 xl:text-h5"
                    >
                        {tier.name}
                    </h3>
                    {tier.featured && <MostChosenBadge />}
                </div>
                <p className="mt-5 text-[1.25rem]/[1.45] text-grey-600 sm:mt-4 sm:text-body md:mt-3 md:text-caption xl:mt-4 xl:text-body">
                    {tier.description}
                </p>

                <p className="mt-8 flex flex-wrap items-baseline gap-x-1.5 text-grey-900 sm:mt-6 md:mt-4 xl:mt-6">
                    <span className="text-display-sm font-semibold tracking-tight sm:text-h3 md:text-h5 xl:text-h2">
                        {price.value ? (
                            <AnimatedPrice
                                value={price.value}
                                label={price.amount}
                            />
                        ) : (
                            price.amount
                        )}
                    </span>
                    {price.unit && (
                        <span
                            key={period}
                            className={`${swapIn} text-[1.25rem] font-normal text-grey-600 sm:text-body md:text-caption xl:text-body`}
                        >
                            {price.unit}
                        </span>
                    )}
                </p>
                <p className="mt-2.5 text-body-lg text-grey-600 sm:mt-2 sm:text-body-sm md:text-caption xl:text-body-sm">
                    <span key={period} className={swapIn}>
                        {price.billed}
                    </span>
                </p>
                <p className="mt-1 text-body leading-[1.45] text-grey-600 sm:mt-1 sm:text-caption">
                    {price.note}
                </p>

                <SiteLink
                    link={tier.cta}
                    className={`mt-7.5 inline-flex h-15.5 w-full items-center justify-center rounded-lg text-[1.25rem] sm:mt-6 transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] sm:h-12 sm:text-body md:h-10 md:text-body-sm xl:h-12 xl:text-body ${tier.featured ? 'bg-primary-400 text-white hover:bg-primary-600' : 'border border-grey-300 bg-white text-grey-900 hover:border-grey-400 hover:bg-grey-50'}`}
                />

                <hr className="mt-13 border-grey-200 sm:mt-9 md:mt-7 xl:mt-10" />

                <p className="mt-8 text-[1.25rem]/[1.45] font-semibold text-grey-900 sm:mt-6 sm:text-body md:mt-4 md:text-caption xl:mt-6 xl:text-body">
                    {tier.limit}
                </p>
                <ul className="mt-5 space-y-2.5 sm:space-y-3 md:mt-3 md:space-y-1.5 xl:mt-4 xl:space-y-2">
                    {tier.features.map((feature) => (
                        <li
                            key={feature}
                            className="flex items-start gap-2.5 text-body-lg text-grey-600 sm:gap-3 sm:text-body-sm md:gap-1.5 md:text-caption xl:gap-2 xl:text-body-sm"
                        >
                            <Check
                                aria-hidden="true"
                                className="size-7.5 shrink-0 text-primary-400 sm:size-5 md:size-4 xl:size-6"
                                strokeWidth={2}
                            />
                            {/* One-line features centre on the tick; wrapped ones hang from it. */}
                            <span className="self-center">{feature}</span>
                        </li>
                    ))}
                </ul>
            </article>
        </li>
    )
}

export const TierCards = ({ period }: { period: BillingPeriod }) => (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 md:grid-cols-4 xl:mt-16 xl:gap-6">
        {pricingTiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} period={period} />
        ))}
    </ul>
)
