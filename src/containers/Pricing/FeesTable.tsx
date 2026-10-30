import { additionalFees } from '@/data/pricing'

const cell =
    'border-t border-grey-200 px-4 py-6 text-body text-grey-800 md:text-body-sm xl:text-body'

export const FeesTable = () => (
    <div className="rounded-2xl bg-grey-50 p-2">
        <div className="rounded-2xl border border-grey-200 bg-white py-4 xl:py-6">
            <div className="mx-4 overflow-x-auto sm:mx-6 md:mx-8">
                <table className="w-full min-w-172 table-fixed border-separate border-spacing-0 text-left">
                    <caption className="sr-only">Additional Zebul fees</caption>
                    <colgroup>
                        <col className="w-44 md:w-55 xl:w-76" />
                        <col className="w-64 md:w-70 xl:w-100" />
                        <col />
                    </colgroup>
                    <thead>
                        <tr>
                            {additionalFees.columns.map((column, index) => (
                                <th
                                    key={column}
                                    scope="col"
                                    className={`px-4 pb-6 text-body-lg font-semibold text-grey-900 xl:text-h5 ${index === 0 ? 'sticky left-0 z-10 bg-white' : ''}`}
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
                                    className={`${cell} sticky left-0 z-10 bg-white font-normal`}
                                >
                                    {row.fee}
                                </th>
                                <td className={cell}>{row.amount}</td>
                                <td className={cell}>{row.paidBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)
