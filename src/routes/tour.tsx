import { createFileRoute } from '@tanstack/react-router'
import { Cta } from '@/containers/Home'
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
            <Cta />
        </main>
    )
}
