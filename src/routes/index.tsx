import { createFileRoute } from '@tanstack/react-router'
import { CtaBanner } from '@/components/CtaBanner'
import {
    Explore,
    Hero,
    // TrustedBy,
    WhatZebulIs,
    WhoItServes,
} from '@/containers/Home'

export const Route = createFileRoute('/')({
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
