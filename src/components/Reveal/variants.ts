export const revealEase = [0.16, 1, 0.3, 1] as const

export const revealTransition = {
    duration: 0.7,
    ease: revealEase,
} as const

export const revealItemVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
        opacity: 1,
        y: 0,
        transition: revealTransition,
    },
} as const

export const revealContainerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
} as const
