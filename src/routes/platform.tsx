import { createFileRoute } from '@tanstack/react-router'
import { PlatformPage } from '@/containers/Platform'

export const Route = createFileRoute('/platform')({
    component: PlatformPage,
})
