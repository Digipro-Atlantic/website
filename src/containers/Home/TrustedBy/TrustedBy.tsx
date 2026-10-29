import { Container } from '@/components/Container'
import { trustedBy } from '@/data/home'

const { logos } = trustedBy

export const TrustedBy = () => (
    <section aria-labelledby="trusted-by" className="mt-16 sm:mt-24 xl:mt-32">
        <Container>
            <h2
                id="trusted-by"
                className="text-center text-body font-medium text-grey-900 sm:text-h6 xl:text-h5"
            >
                {trustedBy.title}
            </h2>

            {/* Marquee: the list is rendered twice and the track slides by half its width. */}
            <div className="mt-8 overflow-hidden mask-x-from-90% mask-x-to-100% xl:mt-12">
                <ul className="flex w-max animate-marquee items-center motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6">
                    {[...logos, ...logos].map((logo, index) => {
                        const isCopy = index >= logos.length
                        return (
                            <li
                                key={`${logo.name}-${index}`}
                                aria-hidden={isCopy || undefined}
                                className={`shrink-0 pr-14 ${isCopy ? 'motion-reduce:hidden' : ''}`}
                            >
                                <img
                                    src={logo.src}
                                    alt={isCopy ? '' : logo.name}
                                    className={`h-auto ${logo.className}`}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Container>
    </section>
)
