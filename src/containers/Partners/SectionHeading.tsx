type SectionHeadingProps = {
    label: string
    title: string
    description: string
    className?: string
}

/** Centred label / h2 / lead; same scale as PageHero but an h2. */
export const SectionHeading = ({
    label,
    title,
    description,
    className = '',
}: SectionHeadingProps) => (
    <div
        className={`mx-auto flex max-w-306 flex-col items-center text-center ${className}`}
    >
        <p className="text-body-lg font-medium text-grey-800 md:text-h6 xl:text-h5">
            {label}
        </p>
        <h2 className="mt-4 text-h4 font-semibold text-balance text-primary-900 md:text-h1 xl:text-display-sm">
            {title}
        </h2>
        <p className="mt-4 max-w-235 text-body text-balance text-grey-700 xl:mt-2 xl:text-body-lg">
            {description}
        </p>
    </div>
)
