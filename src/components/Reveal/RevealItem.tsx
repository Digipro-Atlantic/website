import { motion, useReducedMotion } from 'motion/react'
import { revealItemVariants } from './variants'

type RevealItemProps = {
    children: React.ReactNode
    className?: string
}

export const RevealItem = ({ children, className }: RevealItemProps) => {
    const prefersReducedMotion = useReducedMotion()

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>
    }

    return (
        <motion.div
            className={className}
            initial="hidden"
            variants={revealItemVariants}
        >
            {children}
        </motion.div>
    )
}
