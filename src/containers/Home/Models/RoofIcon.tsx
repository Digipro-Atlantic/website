type RoofIconProps = {
    className?: string
}

export const RoofIcon = ({ className = '' }: RoofIconProps) => (
    <svg
        viewBox="0 0 44 36"
        fill="none"
        className={className}
        aria-hidden="true"
    >
        <path
            d="M4 30 V14 L22 4 L40 14 V30"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
        />
    </svg>
)
