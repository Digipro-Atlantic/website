import { createFileRoute } from '@tanstack/react-router'
import { ContactPage } from '@/containers/Contact'

export const Route = createFileRoute('/contact')({
    component: ContactPage,
})
