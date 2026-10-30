import { SiteLink } from '@/components/SiteLink'
import {
    comparison,
    comparisonRows,
    getTierPrice,
    pricingTiers,
} from '@/data/pricing'
import type { BillingPeriod } from '@/data/pricing'
import { BillingToggle } from './BillingToggle'

type ComparisonTableProps = {
    period: BillingPeriod
    onPeriodChange: (period: BillingPeriod) => void
}

const stickyCell = 'sticky left-0 z-10 bg-white'

const TableIntro = ({ period, onPeriodChange }: ComparisonTableProps) => (
    <>
        <h3 className="text-h5 font-semibold tracking-tight text-grey-900 md:text-body-lg xl:text-h5">
            {comparison.tableTitle}
        </h3>
        <p className="mt-3 max-w-60 text-body text-grey-600 md:text-body-sm xl:text-body">
            {comparison.tableDescription}
        </p>
        <BillingToggle
            compact
            value={period}
            onChange={onPeriodChange}
            className="mt-6"
        />
    </>
)

export const ComparisonTable = ({
    period,
    onPeriodChange,
}: ComparisonTableProps) => (
    <div className="rounded-2xl bg-grey-50 p-2">
        <div className="rounded-2xl border border-grey-200 bg-white pt-8 pb-4 md:pt-0 xl:pb-8">
            {/* Narrow screens: title and toggle sit above the scrolling table so they stay put. */}
            <div className="mx-6 mb-6 md:hidden">
                <TableIntro period={period} onPeriodChange={onPeriodChange} />
            </div>

            {/* Only this wrapper scrolls sideways; the first column stays pinned. */}
            <div className="mx-4 overflow-x-auto sm:mx-6 md:mx-8">
                <table className="w-full min-w-204 table-fixed border-separate border-spacing-0 text-left">
                    <caption className="sr-only">
                        Features included in each plan
                    </caption>
                    <colgroup>
                        <col className="w-44 md:w-56 xl:w-86" />
                        <col />
                        <col />
                        <col />
                        <col />
                    </colgroup>
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className={`${stickyCell} pb-9 align-top font-normal md:pt-14 xl:pt-16 xl:pr-8 xl:pl-8`}
                            >
                                <span className="sr-only md:hidden">
                                    Feature
                                </span>
                                <div className="hidden md:block">
                                    <TableIntro
                                        period={period}
                                        onPeriodChange={onPeriodChange}
                                    />
                                </div>
                            </th>
                            {pricingTiers.map((tier) => {
                                const price = getTierPrice(tier, period)

                                return (
                                    <th
                                        key={tier.id}
                                        scope="col"
                                        className={`px-4 pb-9 align-top font-normal xl:px-7 ${tier.featured ? 'border-t-[32px] border-t-white bg-primary-50 bg-clip-padding pt-8 md:pt-6' : 'pt-16 md:pt-14 xl:pt-16'}`}
                                    >
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                            <span className="text-h5 font-semibold tracking-tight text-grey-900 md:text-body-lg xl:text-h5">
                                                {tier.name}
                                            </span>
                                            {tier.featured && (
                                                <span className="rounded-full border border-primary-400 bg-primary-50 px-3 py-0.5 text-caption font-normal text-primary-400 xl:text-body-sm">
                                                    Most Chosen
                                                </span>
                                            )}
                                        </div>
                                        <span className="mt-2 block text-body text-grey-600 md:text-body-sm xl:text-body">
                                            {price.tableLine}
                                        </span>
                                        <span className="mt-1 block text-body-sm text-grey-600 md:text-caption xl:text-body-sm">
                                            {price.tableNote}
                                        </span>
                                        <SiteLink
                                            link={{
                                                label: tier.tableCtaLabel,
                                                to: tier.cta.to,
                                            }}
                                            className={`mt-5 inline-flex h-12 w-full items-center justify-center rounded-lg px-2 text-body whitespace-nowrap transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] md:h-10 md:text-body-sm xl:h-12 xl:text-body ${tier.featured ? 'bg-primary-400 text-white hover:bg-primary-600' : 'border border-grey-300 bg-white text-grey-900 hover:border-grey-400 hover:bg-grey-50'}`}
                                        />
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonRows.map((row) => (
                            <tr key={row.feature}>
                                <th
                                    scope="row"
                                    className={`${stickyCell} h-16 border-t border-grey-200 px-4 py-5 text-body font-normal text-grey-800 md:text-body-sm xl:pr-8 xl:pl-8 xl:text-body`}
                                >
                                    {row.feature}
                                </th>
                                {row.values.map((value, index) => (
                                    <td
                                        key={pricingTiers[index].id}
                                        className={`border-t border-grey-200 px-2 py-5 text-center text-body whitespace-pre-line text-grey-800 md:text-body-sm xl:text-body ${row.detail ? '' : 'font-medium'} ${pricingTiers[index].featured ? 'bg-primary-50' : ''}`}
                                    >
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)
