import type { CSSProperties } from 'react'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { CtaBanner } from '@/components/CtaBanner'
import { Page } from '@/components/Page'
import { PageHero } from '@/components/PageHero'
import {
    financingBoundaries,
    financingFlow,
    financingHero,
} from '@/data/financing'
import { desktopCurve, tabletCurve } from './curves'

type Curve = typeof desktopCurve

const pct = (value: number, origin: number, size: number) =>
    `${(((value - origin) / size) * 100).toFixed(3)}%`

/** Step text is positioned as a percentage of the curve box so it scales with it. */
const placementVars = (step: (typeof financingFlow)[number]) =>
    ({
        '--tl': pct(
            step.tablet.x,
            tabletCurve.viewBox.x,
            tabletCurve.viewBox.width,
        ),
        '--tt': pct(
            step.tablet.y,
            tabletCurve.viewBox.y,
            tabletCurve.viewBox.height,
        ),
        '--dl': pct(
            step.desktop.x,
            desktopCurve.viewBox.x,
            desktopCurve.viewBox.width,
        ),
        '--dt': pct(
            step.desktop.y,
            desktopCurve.viewBox.y,
            desktopCurve.viewBox.height,
        ),
    }) as CSSProperties

const FlowCurve = ({
    curve,
    nodes,
    radius,
    className,
}: {
    curve: Curve
    nodes: { cx: number; cy: number }[]
    radius: number
    className: string
}) => {
    const { x, y, width, height } = curve.viewBox
    return (
        <svg
            aria-hidden="true"
            viewBox={`${x} ${y} ${width} ${height}`}
            className={`absolute inset-0 h-full w-full ${className}`}
        >
            <path d={curve.d} fill="#000805" />
            {nodes.map((node) => (
                <circle
                    key={`${node.cx}-${node.cy}`}
                    cx={node.cx}
                    cy={node.cy}
                    r={radius}
                    fill="white"
                    stroke="#005B4C"
                    strokeWidth={3}
                />
            ))}
        </svg>
    )
}

const ArrowDown = () => (
    <svg
        aria-hidden="true"
        width="16"
        height="65"
        viewBox="0 0 16 65"
        fill="none"
        className="mx-auto mt-3 mb-4 md:hidden"
    >
        <g transform="translate(-212 -666)">
            <path
                d="M220 666H219V730H220H221V666H220ZM219.293 730.707C219.683 731.098 220.317 731.098 220.707 730.707L227.071 724.343C227.462 723.953 227.462 723.319 227.071 722.929C226.681 722.538 226.047 722.538 225.657 722.929L220 728.586L214.343 722.929C213.953 722.538 213.319 722.538 212.929 722.929C212.538 723.319 212.538 723.953 212.929 724.343L219.293 730.707Z"
                fill="black"
            />
        </g>
    </svg>
)

const { role, score } = financingBoundaries

export const FinancingPage = () => (
    <Page>
        <PageHero
            label={financingHero.label}
            title={financingHero.title}
            description={financingHero.description}
        />

        <Container className="mt-10 md:mt-15 xl:mt-32">
            <div className="relative mx-auto md:aspect-[820/670] md:w-205 xl:aspect-[960/780] xl:w-240">
                <FlowCurve
                    curve={tabletCurve}
                    nodes={financingFlow.map((step) => step.tablet)}
                    radius={6}
                    className="hidden md:block xl:hidden"
                />
                <FlowCurve
                    curve={desktopCurve}
                    nodes={financingFlow.map((step) => step.desktop)}
                    radius={9}
                    className="hidden xl:block"
                />
                {/* Mobile: centred vertical stack with arrows. md+: steps pinned beside their curve node. */}
                <ol className="md:absolute md:inset-0">
                    {financingFlow.map((step, index) => (
                        <li
                            key={step.title}
                            style={placementVars(step)}
                            className="text-center md:absolute md:top-(--tt) md:left-(--tl) md:w-52 md:text-left xl:top-(--dt) xl:left-(--dl) xl:w-62"
                        >
                            <p className="text-h6 font-semibold text-grey-900 md:text-body xl:text-h6">
                                {step.title}
                            </p>
                            <p className="mx-auto mt-2 max-w-80 text-body text-balance text-grey-600 md:mx-0 md:max-w-none md:text-caption xl:text-body-sm">
                                {step.description}
                            </p>
                            {index < financingFlow.length - 1 && <ArrowDown />}
                        </li>
                    ))}
                </ol>
            </div>
        </Container>

        <Container className="mt-20 md:mt-40 xl:mt-48">
            <section aria-labelledby="financing-boundaries">
                <div className="mx-auto flex max-w-241 flex-col items-center gap-2 text-center md:gap-4">
                    <p className="text-body-lg font-medium text-grey-900 md:text-h6 xl:text-h5">
                        {financingBoundaries.label}
                    </p>
                    <h2
                        id="financing-boundaries"
                        className="max-w-80 text-h4 font-semibold text-balance text-primary-900 sm:max-w-none md:text-h1 xl:text-display-sm"
                    >
                        {financingBoundaries.title}
                    </h2>
                </div>

                <div className="mt-11 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-4 xl:mt-22 xl:gap-6">
                    <Card className="flex flex-col p-6 md:p-8 xl:p-12">
                        <h3 className="text-h5 font-semibold text-grey-900 md:text-h6 xl:text-h3">
                            {role.title}
                        </h3>
                        <p className="mt-8 text-body-sm text-grey-600 md:mt-6 xl:text-body-lg">
                            {role.description}
                        </p>
                        <hr className="mt-6 border-grey-300 xl:mt-5" />
                        {/* Figma draws a green stripe down this note's left edge; shown as a tinted panel instead. */}
                        <p className="mt-6 rounded-lg bg-primary-50 p-4 text-caption text-grey-600 xl:text-body">
                            {role.note}
                        </p>
                    </Card>

                    <Card className="p-6 md:p-8 xl:p-12">
                        <div className="flex flex-col items-start gap-3 md:flex-row md:justify-between">
                            <h3 className="text-h5 font-semibold text-grey-900 md:text-h6 xl:text-h3">
                                {score.title}
                            </h3>
                            <span className="inline-flex h-8 shrink-0 items-center rounded-full bg-primary-400 px-3 text-body-sm text-white uppercase md:h-6 md:text-caption xl:h-8 xl:px-4 xl:text-body-sm">
                                {score.badge}
                            </span>
                        </div>
                        <p className="mt-6 text-display-sm font-medium text-primary-400 md:text-h2 xl:mt-5 xl:text-display-lg">
                            {score.value}
                        </p>
                        <p className="mt-1.5 text-body text-grey-600 uppercase md:text-caption xl:text-body-lg">
                            {score.caption}
                        </p>
                        <p className="mt-6 text-body text-grey-600 md:mt-4 md:text-body-sm xl:mt-6 xl:text-body-lg">
                            {score.description}
                        </p>
                    </Card>
                </div>
            </section>
        </Container>

        <CtaBanner />
    </Page>
)
