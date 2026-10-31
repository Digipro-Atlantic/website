import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '@/data/seo'
import { CtaBanner } from '@/components/CtaBanner'
import {
    Explore,
    Hero,
    // TrustedBy,
    WhatZebulIs,
    WhoItServes,
} from '@/containers/Home'

export const Route = createFileRoute('/')({
    head: () => pageHead('/'),
    component: () => <HomePage />,
})

const HomePage = () => {
    return (
        <main>
            <Hero />
            {/* <TrustedBy /> */}
            <WhatZebulIs />
            <WhoItServes />
            <Explore />
            <CtaBanner />
        </main>
    )
}
