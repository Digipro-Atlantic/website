import { Reveal } from '@/components/Reveal'
import type { TourStep } from '@/data/types'
import { TourCopy } from '../TourCopy'
import { TourScreen } from '../screens'

type TourRowProps = {
    step: TourStep
}

export const TourRow = ({ step }: TourRowProps) => (
    <div
        className={`mx-auto grid max-w-[1180px] items-center gap-[26px] px-7 py-10 min-[821px]:grid-cols-[1.08fr_0.92fr] min-[821px]:gap-[50px] ${
            step.flip ? 'min-[821px]:[&>*:first-child]:order-2' : ''
        }`}
    >
        <Reveal>
            <TourScreen id={step.screen} />
        </Reveal>
        <Reveal>
            <TourCopy
                stepLabel={step.stepLabel}
                title={step.title}
                description={step.description}
                bullets={step.bullets}
            />
        </Reveal>
    </div>
)
