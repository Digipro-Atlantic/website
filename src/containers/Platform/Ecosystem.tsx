import { Fragment } from 'react'
import ecosystemImage from '@/assets/platform/ecosystem.webp'
import { Container } from '@/components/Container'
import { ecosystem } from '@/data/platform'

export const Ecosystem = () => (
    <Container className="mt-20 md:mt-24 xl:mt-36">
        <section aria-labelledby="ecosystem-title">
            <div className="mx-auto flex max-w-250 flex-col items-center gap-4 text-center">
                <p className="text-body-lg font-medium text-[#0c1017] md:text-h6 xl:text-h5">
                    {ecosystem.label}
                </p>
                <h2
                    id="ecosystem-title"
                    className="text-h5 font-semibold text-primary-900 md:text-h1 xl:text-display-sm"
                >
                    {ecosystem.title.map((line, index) => (
                        <Fragment key={line}>
                            {index > 0 && <br className="hidden md:inline" />}
                            {index > 0 && ' '}
                            {line}
                        </Fragment>
                    ))}
                </h2>
                <p className="text-body text-grey-700 md:max-w-[789px] xl:max-w-none xl:text-body-lg">
                    {ecosystem.description.map((line, index) => (
                        <Fragment key={line}>
                            {index > 0 && <br className="hidden xl:inline" />}
                            {index > 0 && ' '}
                            {line}
                        </Fragment>
                    ))}
                </p>
            </div>

            {/* The orbit line, padlock and nodes are baked into the photo asset. */}
            <div className="mt-12 grid gap-8 md:mt-18 md:grid-cols-2 md:items-start md:gap-4 xl:mt-34 xl:grid-cols-[1.037fr_1fr] xl:gap-14">
                <img
                    src={ecosystemImage}
                    alt=""
                    aria-hidden="true"
                    width={1296}
                    height={1304}
                    loading="lazy"
                    className="h-auto w-full"
                />
                {/* Figma starts the list ~20px below the photo's top edge. */}
                <ul className="divide-y divide-grey-300 md:mt-5">
                    {ecosystem.items.map((item) => (
                        <li
                            key={item.id}
                            className="p-6 md:py-5 xl:pt-6 xl:pb-10"
                        >
                            <h3 className="text-body-lg font-semibold text-grey-900 xl:text-h6">
                                {item.title}
                            </h3>
                            <p className="mt-6 text-body text-grey-700 md:mt-4 md:text-body-sm xl:mt-6 xl:text-body-lg">
                                {item.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    </Container>
)
