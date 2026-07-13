import { motion, useReducedMotion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { revealContainerVariants } from './variants'

type RevealGroupProps = {
    children: React.ReactNode
    className?: string
}

export const RevealGroup = ({ children, className }: RevealGroupProps) => {
    const prefersReducedMotion = useReducedMotion()
    const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={revealContainerVariants}
        >
            {children}
        </motion.div>
    )
}
