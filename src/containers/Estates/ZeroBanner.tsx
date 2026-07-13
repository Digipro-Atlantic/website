import { estatesZeroBanner } from '@/data/estates'

export const ZeroBanner = () => (
    <div className="mt-5 inline-flex items-center gap-2.5 rounded-[10px] bg-teal-800 px-[18px] py-3.5 text-sm text-white">
        <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="#D4A94A"
            strokeWidth="2"
            className="shrink-0"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M8.5 12.5l2.5 2.5 4.5-5" />
        </svg>
        <span>
            <b className="text-gold-soft">{estatesZeroBanner.bold}</b>{' '}
            {estatesZeroBanner.text}
        </span>
    </div>
)
