export const EstateArt = () => (
    <svg
        viewBox="0 0 460 380"
        fill="none"
        className="h-full w-full overflow-visible"
        aria-hidden="true"
    >
        <line
            x1="20"
            y1="320"
            x2="440"
            y2="320"
            stroke="#D4A94A"
            strokeWidth="1.4"
            opacity="0.6"
        />
        <g
            stroke="#3E9277"
            strokeWidth="1.6"
            strokeLinejoin="round"
            opacity="0.85"
        >
            <path d="M40 320 V210 L100 165 L160 210 V320" />
            <path d="M170 320 V190 L235 140 L300 190 V320" />
            <path d="M310 320 V225 L360 188 L410 225 V320" />
        </g>
        <g stroke="#D4A94A" strokeWidth="1.8" strokeLinejoin="round">
            <path d="M95 320 V150 L185 85 L275 150 V320" />
        </g>
        <g fill="none" stroke="#F1F7F4" strokeWidth="1.2" opacity="0.55">
            <rect x="150" y="180" width="20" height="20" />
            <rect x="200" y="180" width="20" height="20" />
            <rect x="150" y="230" width="20" height="20" />
            <rect x="200" y="230" width="20" height="20" />
            <rect x="170" y="278" width="30" height="42" />
        </g>
        <g fill="#D4A94A">
            <circle cx="100" cy="165" r="3.2" />
            <circle cx="235" cy="140" r="3.2" />
            <circle cx="360" cy="188" r="3.2" />
            <circle cx="185" cy="85" r="3.6" />
        </g>
        <g stroke="#D4A94A" strokeWidth="1" opacity="0.4" strokeDasharray="4 5">
            <line x1="185" y1="85" x2="100" y2="165" />
            <line x1="185" y1="85" x2="235" y2="140" />
            <line x1="235" y1="140" x2="360" y2="188" />
        </g>
    </svg>
)
