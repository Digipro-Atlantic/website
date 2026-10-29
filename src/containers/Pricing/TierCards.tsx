import { Check } from 'lucide-react'
import { SiteLink } from '@/components/SiteLink'
import { getTierPrice, pricingTiers } from '@/data/pricing'
import type { BillingPeriod, PricingTier } from '@/data/pricing'

const MostChosenBadge = ({ className = '' }: { className?: string }) => (
    <span
        className={`rounded-full bg-primary-400 px-3 py-0.5 text-caption text-white xl:text-body-sm ${className}`}
    >
        Most Chosen
    </span>
)

const TierCard = ({
    tier,
    period,
}: {
    tier: PricingTier
    period: BillingPeriod
}) => {
    const price = getTierPrice(tier, period)

    return (
        <li className="rounded-2xl bg-grey-50 p-2 md:p-1.5 xl:p-2">
            <article
                aria-labelledby={`tier-${tier.id}`}
                className={`flex h-full flex-col rounded-2xl bg-white p-6 sm:p-5 xl:p-8 ${tier.featured ? 'border-[1.5px] border-primary-400' : 'border border-grey-200'}`}
            >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3
                        id={`tier-${tier.id}`}
                        className="text-h4 font-semibold tracking-tight text-grey-900 sm:text-h5 md:text-h6 xl:text-h5"
                    >
                        {tier.name}
                    </h3>
                    {tier.featured && <MostChosenBadge />}
                </div>
                <p className="mt-3 text-body-lg text-grey-600 sm:text-body md:text-body-sm xl:text-body">
                    {tier.description}
                </p>

                <p className="mt-6 flex flex-wrap items-baseline gap-x-1.5 text-grey-900">
                    <span className="text-h1 font-semibold tracking-tight sm:text-h3 md:text-h5 xl:text-h2">
                        {price.amount}
                    </span>
                    {price.unit && (
                        <span className="text-body-lg font-normal text-grey-600 sm:text-body md:text-body-sm xl:text-body">
                            {price.unit}
                        </span>
                    )}
                </p>
                <p className="mt-2 text-body text-grey-600 sm:text-body-sm">
                    {price.billed}
                </p>
                <p className="mt-0.5 text-body-sm text-grey-600 sm:text-caption">
                    {price.note}
                </p>

                <SiteLink
                    link={tier.cta}
                    className={`mt-6 inline-flex h-14 w-full items-center justify-center rounded-lg text-body-lg transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] sm:h-12 sm:text-body md:h-10 md:text-body-sm xl:h-12 xl:text-body ${tier.featured ? 'bg-primary-400 text-white hover:bg-primary-600' : 'border border-grey-300 bg-white text-grey-900 hover:border-grey-400 hover:bg-grey-50'}`}
                />

                <hr className="mt-9 border-grey-200" />

                <p className="mt-6 text-h6 font-semibold text-grey-900 sm:text-body md:text-body-sm xl:text-body">
                    {tier.limit}
                </p>
                <ul className="mt-5 space-y-3">
                    {tier.features.map((feature) => (
                        <li
                            key={feature}
                            className="flex items-start gap-3 text-body text-grey-600 sm:text-body-sm"
                        >
                            <Check
                                aria-hidden="true"
                                className="size-5 shrink-0 text-primary-400"
                                strokeWidth={2}
                            />
                            {feature}
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
