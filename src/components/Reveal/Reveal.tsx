import { type ElementType } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { revealItemVariants } from './variants'

type RevealElement = 'div' | 'section' | 'article' | 'p' | 'span'

const motionComponents = {
    div: motion.div,
    section: motion.section,
    article: motion.article,
    p: motion.p,
    span: motion.span,
} as const

type RevealProps = {
    children: React.ReactNode
    className?: string
    immediate?: boolean
    as?: RevealElement
}

export const Reveal = ({
    children,
    className,
    immediate = false,
    as = 'div',
}: RevealProps) => {
    const prefersReducedMotion = useReducedMotion()
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
        delay: 100,
    })
    const shouldShow = immediate || prefersReducedMotion || inView

    if (prefersReducedMotion || immediate) {
        const Component = as as ElementType
        return <Component className={className}>{children}</Component>
    }

    const MotionComponent = motionComponents[as]

    return (
        <MotionComponent
            ref={ref}
            className={className}
            initial="hidden"
            animate={shouldShow ? 'visible' : 'hidden'}
            variants={revealItemVariants}
        >
            {children}
        </MotionComponent>
    )
}
