import { Fragment } from 'react'

type SectionIntroProps = {
    label: string
    title: string
    /** Pass lines to reproduce Figma's breaks from tablet up; mobile wraps freely. */
    description?: string | readonly string[]
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
        <p className="text-body-lg font-medium text-[#0c1017] sm:text-h6 xl:text-h5">
            {label}
        </p>
        <h2 className="text-h5 font-semibold text-balance text-primary-900 sm:text-h1 xl:text-display-sm">
            {title}
        </h2>
        {typeof description === 'string' && (
            <p className="text-body-sm text-balance text-grey-700 sm:text-body xl:text-body-lg">
                {description}
            </p>
        )}
        {Array.isArray(description) && (
            <p className="mx-auto max-w-96 text-body-sm text-grey-700 sm:max-w-none sm:text-body xl:text-body-lg">
                {description.map((line, index) => (
                    <Fragment key={line}>
                        {index > 0 && <br className="hidden sm:inline" />}
                        {index > 0 && ' '}
                        {line}
                    </Fragment>
                ))}
            </p>
        )}
    </div>
)
