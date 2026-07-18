import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/partners')({
    // Soft-launch: partner enquiries use the demo form
    beforeLoad: () => {
        throw redirect({
            to: '/demo',
            search: { intent: 'partner' },
        })
    },
    component: () => null,
})
