import { useEffect, useId, useRef } from 'react'
import { animate, useReducedMotion } from 'motion/react'
import { Coins } from 'lucide-react'
import line from '@/assets/partners/lending/line.webp'
import plane from '@/assets/partners/lending/plane.webp'
import loanApplicant from '@/assets/partners/loan-applicant.webp'
import { partners } from '@/data/partners'
import { ART, LINE_PATH, PLANE } from './lendingArt'

const DRAW_DELAY_S = 0.5 // let the photo finish sliding in first
const DRAW_S = 1.8
const EASE = [0.65, 0, 0.35, 1] as const // ease-in-out cubic, as on the other drawn lines
// The plane leaves just before the line reaches it, so the two read as one motion.
const PLANE_AT_S = DRAW_DELAY_S + DRAW_S * 0.85
const PLANE_FLY = { type: 'spring', visualDuration: 0.5, bounce: 0.2 } as const
// Where the plane starts, back along the line's last heading (art px).
const PLANE_FROM = { x: -36, y: 14 }

const { lending } = partners

/**
 * The "Lend against rent" artwork (Figma Parralax3). Once `play` is set the
 * line draws out of his phone, loops behind him and, as it ends, the paper
 * plane flies off its tip. Reduced motion shows the finished picture.
 */
export const LendingIllustration = ({ play }: { play: boolean }) => {
    const reduce = useReducedMotion()
    const maskId = `lend-line-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
    const revealRef = useRef<SVGPathElement>(null)
    const planeRef = useRef<SVGGElement>(null)

    useEffect(() => {
        const reveal = revealRef.current
        const planeGroup = planeRef.current
        if (!play || reduce || !reveal || !planeGroup) return

        const draw = animate(0, 1, {
            duration: DRAW_S,
            delay: DRAW_DELAY_S,
            ease: EASE,
            onUpdate: (p) => {
                reveal.style.strokeDashoffset = String(1 - p)
            },
        })
        const fly = animate(0, 1, {
            ...PLANE_FLY,
            delay: PLANE_AT_S,
            onUpdate: (v) => {
                planeGroup.setAttribute(
                    'transform',
                    `translate(${PLANE_FROM.x * (1 - v)} ${PLANE_FROM.y * (1 - v)})`,
                )
                planeGroup.setAttribute('opacity', String(Math.min(1, v * 1.6)))
            },
        })
        return () => {
            draw.stop()
            fly.stop()
        }
    }, [play, reduce])

    return (
        <div className="relative aspect-[642/611] w-full max-w-160.5">
            {/* Under the photo, as in Figma: the line passes behind him. */}
            <svg
                viewBox={`0 0 ${ART.width} ${ART.height}`}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 size-full overflow-visible"
            >
                <defs>
                    <mask
                        id={maskId}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={ART.width}
                        height={ART.height}
                    >
                        <path
                            ref={revealRef}
                            d={LINE_PATH}
                            fill="none"
                            stroke="#fff"
                            strokeWidth={12}
                            strokeLinecap="round"
                            pathLength={1}
                            strokeDasharray="1 1"
                            strokeDashoffset={reduce ? 0 : 1}
                        />
                    </mask>
                </defs>
                <image
                    href={line}
                    width={642}
                    height={325}
                    mask={`url(#${maskId})`}
                />
                <g ref={planeRef} opacity={reduce ? 1 : 0}>
                    <image href={plane} {...PLANE} />
                </g>
            </svg>
            <img
                src={loanApplicant}
                alt=""
                aria-hidden="true"
                width={960}
                height={1110}
                loading="lazy"
                className="absolute bottom-0 left-0 w-[74.8%]"
            />
            <div
                aria-hidden="true"
                className={`absolute top-[20.3%] right-[1.6%] flex items-center gap-2.5 rounded-2xl border border-[#E2FCF4] bg-white py-3 pr-4 pl-3 shadow-[0_4px_24px_rgb(16_25_40/0.08)] transition-[opacity,scale] delay-300 duration-500 ease-out xl:gap-3.5 xl:py-5 xl:pr-6 xl:pl-5 ${
                    play || reduce
                        ? 'scale-100 opacity-100'
                        : 'scale-95 opacity-0'
                }`}
            >
                <span className="flex size-8 items-center justify-center rounded-lg bg-[#E2FCF4] text-primary-400 xl:size-10.5">
                    <Coins className="size-5 xl:size-6" strokeWidth={1.75} />
                </span>
                <span className="flex flex-col whitespace-nowrap">
                    <span className="text-caption text-grey-600 xl:text-body-sm">
                        {lending.loanLabel}
                    </span>
                    <span className="text-body font-semibold text-black xl:text-h4 xl:tracking-[-0.02em]">
                        {lending.loanAmount}
                    </span>
                </span>
            </div>
        </div>
    )
}
