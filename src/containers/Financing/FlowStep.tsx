import type { FinancingStep } from '@/data/types'

type FlowStepProps = {
    step: FinancingStep
    showConnector?: boolean
}

export const FlowStep = ({ step, showConnector = false }: FlowStepProps) => (
    <div
        className={`relative px-[18px] ${
            showConnector
                ? 'after:absolute after:top-[21px] after:right-[-2px] after:z-[1] after:h-0.5 after:w-[calc(100%-42px)] after:bg-[repeating-linear-gradient(90deg,rgba(212,169,74,0.55)_0_7px,transparent_7px_14px)] max-[980px]:after:hidden'
                : ''
        }`}
    >
        <div className="relative z-[2] flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold bg-teal-900 font-mono text-base font-semibold text-gold-soft">
            {step.number}
        </div>
        <h4 className="mt-[18px] mb-[7px] font-body text-[15px] font-semibold text-white">
            {step.title}
        </h4>
        <p className="text-[13px] text-white/72">{step.description}</p>
    </div>
)
