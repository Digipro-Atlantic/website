import { additionalFees } from '@/data/pricing'

// From tablet up, Figma's fixed row heights (45 / 68px tablet, 64 / 96px desktop) and 22 / 32px insets.
const cell =
    'border-t border-grey-200 px-4 py-6 text-body text-[#0c1017] md:px-5.5 md:py-3 md:text-caption xl:px-8 xl:py-2.5 xl:text-body'

const rowHeight = (tall: boolean) =>
    tall ? 'md:h-17 xl:h-24' : 'md:h-11.25 xl:h-16'

export const FeesTable = () => (
    <div className="rounded-2xl bg-grey-50 p-2">
        <div className="rounded-2xl border border-grey-200 bg-white py-4 md:pt-0 md:pb-1">
            <div className="mx-4 overflow-x-auto sm:mx-6 md:mx-5.5 xl:mx-8">
                <table className="w-full min-w-172 table-fixed border-separate border-spacing-0 text-left">
                    <caption className="sr-only">Additional Zebul fees</caption>
                    <colgroup>
                        <col className="w-44 md:w-53.5 xl:w-76" />
                        <col className="w-64 md:w-70.5 xl:w-100" />
                        <col />
                    </colgroup>
                    <thead>
                        <tr>
                            {additionalFees.columns.map((column, index) => (
                                <th
                                    key={column}
                                    scope="col"
                                    className={`px-4 pb-6 text-body-lg font-semibold text-grey-900 md:px-5.5 md:py-5.5 xl:p-8 xl:text-h5 ${index === 0 ? 'sticky left-0 z-10 bg-white' : ''}`}
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {additionalFees.rows.map((row) => (
                            <tr key={row.fee}>
                                <th
                                    scope="row"
                                    className={`${cell} ${rowHeight('tall' in row)} sticky left-0 z-10 bg-white font-normal max-md:text-body-sm`}
                                >
                                    {row.fee}
                                </th>
                                <td
                                    className={`${cell} ${rowHeight('tall' in row)}`}
                                >
                                    {row.amount}
                                </td>
                                <td
                                    className={`${cell} ${rowHeight('tall' in row)}`}
                                >
                                    {row.paidBy}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)
