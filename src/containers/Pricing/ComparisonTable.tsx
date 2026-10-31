import { SiteLink } from '@/components/SiteLink'
import {
    comparison,
    comparisonRows,
    getTierPrice,
    pricingTiers,
} from '@/data/pricing'
import type { BillingPeriod, ComparisonRow } from '@/data/pricing'
import { AnimatedPrice, swapIn } from './AnimatedPrice'
import { BillingToggle } from './BillingToggle'

type ComparisonTableProps = {
    period: BillingPeriod
    onPeriodChange: (period: BillingPeriod) => void
}

const stickyCell = 'sticky left-0 z-10 bg-white'

// Figma row heights from tablet up: 45 / 68px (tablet), 64 / 96px (desktop).
const rowHeight = (row: ComparisonRow) =>
    row.tall ? 'h-16 md:h-17 xl:h-24' : 'h-16 md:h-11.25 xl:h-16'

const TableIntro = ({ period, onPeriodChange }: ComparisonTableProps) => (
    <>
        <h3 className="text-h5 font-semibold tracking-tight text-grey-900 md:text-body-lg xl:text-h5">
            {comparison.tableTitle}
        </h3>
        <p className="mt-4 max-w-60 text-body text-grey-600 md:mt-3 md:text-caption xl:mt-4 xl:text-body">
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
            <div className="mx-4 overflow-x-auto sm:mx-6 md:mx-5.5 xl:mx-8">
                <table className="w-full min-w-204 table-fixed border-separate border-spacing-0 text-left">
                    <caption className="sr-only">
                        Features included in each plan
                    </caption>
                    <colgroup>
                        <col className="w-44 md:w-61 xl:w-86" />
                        <col />
                        <col />
                        <col />
                        <col />
                    </colgroup>
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className={`${stickyCell} pb-9 align-top font-normal md:pt-11 md:pr-3 md:pb-7 md:pl-5.5 xl:pt-16 xl:pr-8 xl:pb-10 xl:pl-8`}
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
                                        className={`px-4 pb-9 align-top font-normal xl:px-7 md:px-3 md:pb-7 xl:pb-10 ${tier.featured ? 'border-t-[32px] border-t-white bg-primary-50 bg-clip-padding pt-8 md:border-t-[22px] md:pt-5.5 xl:border-t-[32px] xl:pt-8' : 'pt-16 md:pt-11 xl:pt-16'}`}
                                    >
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 md:gap-x-2 xl:gap-x-3">
                                            <span className="text-h5 font-semibold tracking-tight text-grey-900 md:text-body-lg xl:text-h5">
                                                {tier.name}
                                            </span>
                                            {tier.featured && (
                                                <span className="rounded-full border border-primary-400 bg-primary-50 px-3 py-0.5 text-caption md:px-2 xl:px-3 font-normal text-primary-400 xl:text-body-sm">
                                                    Most Chosen
                                                </span>
                                            )}
                                        </div>
                                        <span className="mt-2 block text-body text-grey-600 md:mt-1 md:text-caption xl:mt-2 xl:text-body">
                                            {price.value ? (
                                                <>
                                                    <AnimatedPrice
                                                        value={price.value}
                                                        label={price.amount}
                                                    />
                                                    <span
                                                        key={period}
                                                        className={swapIn}
                                                    >
                                                        {price.unit}
                                                    </span>
                                                </>
                                            ) : (
                                                price.tableLine
                                            )}
                                        </span>
                                        <span className="mt-1 block text-body-sm text-grey-600 md:text-caption xl:text-body-sm">
                                            {price.tableNote}
                                        </span>
                                        <SiteLink
                                            link={{
                                                label: tier.tableCtaLabel,
                                                to: tier.cta.to,
                                            }}
                                            className={`mt-5 inline-flex h-12 w-full items-center justify-center rounded-lg px-2 text-body whitespace-nowrap transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] md:mt-4 md:h-9 md:text-body-sm xl:mt-5 xl:h-12 xl:text-body ${tier.featured ? 'bg-primary-400 text-white hover:bg-primary-600' : 'border border-grey-300 bg-white text-grey-900 hover:border-grey-400 hover:bg-grey-50'}`}
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
                                    className={`${stickyCell} ${rowHeight(row)} border-t border-grey-200 px-4 py-5 text-body-sm font-normal text-[#0c1017] md:py-3 md:pr-3 md:pl-5.5 md:text-caption xl:py-5 xl:pr-8 xl:pl-8 xl:text-body`}
                                >
                                    {row.feature}
                                </th>
                                {row.values.map((value, index) => (
                                    <td
                                        key={pricingTiers[index].id}
                                        className={`${rowHeight(row)} border-t border-grey-200 px-2 py-5 text-center text-body whitespace-pre-line text-[#0c1017] md:py-3 md:text-caption xl:py-5 xl:text-body ${row.detail ? '' : 'font-medium'} ${pricingTiers[index].featured ? 'bg-primary-50' : ''}`}
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
