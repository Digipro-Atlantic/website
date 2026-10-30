import ecosystemImage from '@/assets/platform/ecosystem.webp'
import { Container } from '@/components/Container'
import { ecosystem } from '@/data/platform'

export const Ecosystem = () => (
    <Container className="mt-20 md:mt-24 xl:mt-36">
        <section aria-labelledby="ecosystem-title">
            <div className="mx-auto flex max-w-250 flex-col items-center gap-2 text-center md:gap-4">
                <p className="text-body-lg font-medium text-grey-800 md:text-h6 xl:text-h5">
                    {ecosystem.label}
                </p>
                <h2
                    id="ecosystem-title"
                    className="text-h5 font-semibold text-primary-900 md:text-h1 xl:text-display-sm"
                >
                    {ecosystem.title}
                </h2>
                <p className="max-w-235 text-body text-grey-700 xl:text-body-lg">
                    {ecosystem.description}
                </p>
            </div>

            {/* The orbit line, padlock and nodes are baked into the photo asset. */}
            <div className="mt-11 grid gap-8 md:mt-16 md:grid-cols-2 md:items-center md:gap-4 xl:mt-32 xl:grid-cols-[1.037fr_1fr] xl:gap-14">
                <img
                    src={ecosystemImage}
                    alt=""
                    aria-hidden="true"
                    width={1296}
                    height={1304}
                    loading="lazy"
                    className="h-auto w-full"
                />
                <ul className="divide-y divide-grey-200">
                    {ecosystem.items.map((item) => (
                        <li key={item.id} className="px-6 py-6 xl:py-8">
                            <h3 className="text-body-lg font-semibold text-grey-900 xl:text-h6">
                                {item.title}
                            </h3>
                            <p className="mt-6 text-body text-grey-700 md:mt-4 md:text-body-sm xl:mt-5 xl:text-body-lg">
                                {item.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    </Container>
)
