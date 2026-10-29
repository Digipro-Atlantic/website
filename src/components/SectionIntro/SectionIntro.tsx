type SectionIntroProps = {
    label: string
    title: string
    description?: string
    className?: string
}

/** Centred label / heading / lead used to open each homepage section. */
export const SectionIntro = ({
    label,
    title,
    description,
    className = '',
}: SectionIntroProps) => (
    <div
        className={`mx-auto flex max-w-241 flex-col gap-2 text-center sm:gap-4 ${className}`}
    >
        <p className="text-body-lg font-medium text-grey-900 sm:text-h6 xl:text-h5">
            {label}
        </p>
        <h2 className="text-h5 font-semibold text-balance text-primary-900 sm:text-display-sm">
            {title}
        </h2>
        {description && (
            <p className="text-body-sm text-balance text-grey-700 sm:text-body xl:text-body-lg">
                {description}
            </p>
        )}
    </div>
)
