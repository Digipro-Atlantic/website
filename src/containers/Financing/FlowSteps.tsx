import { financingSteps } from '@/data/financing'
import { FlowStep } from './FlowStep'

export const FlowSteps = () => (
    <div className="mb-10 grid grid-cols-1 min-[681px]:max-[980px]:grid-cols-2 min-[681px]:max-[980px]:gap-y-8 min-[981px]:grid-cols-5">
        {financingSteps.map((step, index) => (
            <FlowStep
                key={step.number}
                step={step}
                showConnector={index < financingSteps.length - 1}
            />
        ))}
    </div>
)
