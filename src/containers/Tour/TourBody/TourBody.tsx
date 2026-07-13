import type { TourStep } from '@/data/types'
import { TourRow } from '../TourRow'

type TourBodyProps = {
    steps: readonly TourStep[]
}

export const TourBody = ({ steps }: TourBodyProps) => (
    <div className="pt-6 pb-2.5">
        {steps.map((step) => (
            <TourRow key={step.id} step={step} />
        ))}
    </div>
)
