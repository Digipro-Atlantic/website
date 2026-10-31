import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '@/data/seo'
import { PlatformPage } from '@/containers/Platform'

export const Route = createFileRoute('/platform')({
    head: () => pageHead('/platform'),
    component: PlatformPage,
})
