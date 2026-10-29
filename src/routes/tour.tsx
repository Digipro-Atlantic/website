import { createFileRoute } from '@tanstack/react-router'
import { CtaBanner } from '@/components/CtaBanner'
import { TourBody, TourHero } from '@/containers/Tour'
import { tourSteps } from '@/data/tour'

export const Route = createFileRoute('/tour')({
    component: TourPage,
})

function TourPage() {
    return (
        <main>
            <TourHero />
            <TourBody steps={tourSteps} />
            <CtaBanner />
        </main>
    )
}
