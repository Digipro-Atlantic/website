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

    // No `initial` here: a variant label on the child would make it control
    // its own variants and ignore RevealGroup, leaving it hidden forever.
    return (
        <motion.div className={className} variants={revealItemVariants}>
            {children}
        </motion.div>
    )
}
