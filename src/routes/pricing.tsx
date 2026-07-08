import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import type { BillingPeriod } from '@/data/types'
import {
    feeRows,
    fees,
    feesNote,
    institutionalBand,
    pricingTiers,
    tierPricing,
} from '@/data/pricing'

export const Route = createFileRoute('/pricing')({
    component: PricingPage,
})

function PricingPage() {
    const [billing, setBilling] = useState<BillingPeriod>('monthly')
    const annual = billing === 'annual'

    return (
        <main className="py-16">
            <div className="wrap">
                <span className="font-mono text-sm font-semibold tracking-widest text-gold uppercase">
                    Pricing
                </span>
                <h1 className="font-display mt-2 text-4xl">Plans and fees</h1>
                <p className="mt-3 max-w-2xl text-ink-soft">
                    Start free as an owner. Upgrade when your portfolio needs
                    more reporting, units, or agency tools.
                </p>

                <div
                    className="price-toggle mt-8"
                    role="group"
                    aria-label="Billing period"
                >
                    <button
                        type="button"
                        className={annual ? '' : 'on'}
                        onClick={() => setBilling('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        type="button"
                        className={annual ? 'on' : ''}
                        onClick={() => setBilling('annual')}
                    >
                        Annual
                        <span className="ml-1 text-xs text-gold">
                            2 months free
                        </span>
                    </button>
                </div>

                <div className="plans">
                    {pricingTiers.map((tier) => {
                        const pricing = tierPricing[tier.id]
                        const amount = annual ? pricing.annual : pricing.monthly
                        const unit = annual ? pricing.unitA : pricing.unitM
                        const note = annual ? pricing.noteA : pricing.noteM
                        const btnClass =
                            tier.cta.variant === 'dark'
                                ? 'btn btn-dark'
                                : tier.cta.variant === 'gold'
                                  ? 'btn btn-gold'
                                  : 'btn btn-outline'

                        return (
                            <article
                                key={tier.id}
                                className={`plan${tier.featured ? ' feat' : ''}`}
                            >
                                {tier.featured && (
                                    <span className="font-mono text-xs font-semibold tracking-wider text-gold uppercase">
                                        Most chosen
                                    </span>
                                )}
                                <h3 className="font-display text-xl">
                                    {tier.name}
                                </h3>
                                <p className="text-sm text-ink-soft">
                                    {tier.description}
                                </p>
                                <div className="amt">
                                    <span>{amount}</span> <small>{unit}</small>
                                </div>
                                <div className="annual">{note}</div>
                                <div className="units">{pricing.units}</div>
                                <ul>
                                    {tier.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                                <Link to={tier.cta.to} className={btnClass}>
                                    {tier.cta.label}
                                </Link>
                            </article>
                        )
                    })}
                </div>

                <div className="mt-12 rounded-lg border border-line bg-teal-100 p-6 md:flex md:items-center md:justify-between md:gap-8">
                    <div>
                        <h4 className="font-display text-xl text-teal-800">
                            {institutionalBand.title}
                        </h4>
                        <p className="mt-2 text-ink-soft">
                            {institutionalBand.description}
                        </p>
                    </div>
                    <Link
                        to={institutionalBand.cta.to}
                        className="btn btn-dark mt-4 shrink-0 md:mt-0"
                    >
                        {institutionalBand.cta.label}
                    </Link>
                </div>

                <div className="mt-12 overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-line">
                                <th className="py-3 pr-4">Fee</th>
                                <th className="py-3 pr-4">Rate</th>
                                <th className="py-3">Applied to</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feeRows.map((row) => (
                                <tr
                                    key={row.name}
                                    className="border-b border-line"
                                >
                                    <td className="py-3 pr-4 font-medium">
                                        {row.name}
                                    </td>
                                    <td className="py-3 pr-4">
                                        {'rateKey' in row
                                            ? fees[row.rateKey]
                                            : row.rate}
                                    </td>
                                    <td className="py-3 text-ink-soft">
                                        {row.appliedTo}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="mt-4 text-sm text-ink-soft">
                        {feesNote.replace('{vat}', fees.vat)}
                    </p>
                </div>
            </div>
        </main>
    )
}
