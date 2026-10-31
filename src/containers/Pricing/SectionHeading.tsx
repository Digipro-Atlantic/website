type SectionHeadingProps = {
    label?: string
    title: string
    description?: string
}

/** Centred h2 block used by every section below the hero. Figma: label 24/20/18, title 48/40/28, lead 18/16/16. */
export const SectionHeading = ({
    label,
    title,
    description,
}: SectionHeadingProps) => (
    <div className="mx-auto flex max-w-235 flex-col items-center text-center">
        {label && (
            <p className="text-body-lg font-medium text-grey-800 md:text-h6 xl:text-h5">
                {label}
            </p>
        )}
        <h2
            className={`text-h4 font-semibold text-balance text-primary-900 md:text-h1 xl:text-display-sm ${label ? 'mt-4' : ''}`}
        >
            {title}
        </h2>
        {description && (
            <p className="mt-4 text-body text-balance text-grey-700 xl:text-body-lg">
                {description}
            </p>
        )}
    </div>
)
