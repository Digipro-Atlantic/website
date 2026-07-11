import { Link, createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/containers/Home'
import { ecoCards } from '@/data/eco-cards'

export const Route = createFileRoute('/')({
    component: IndexComponent,
})

function IndexComponent() {
    return (
        <main>
            <Hero />

            <section className="py-16">
                <div className="wrap">
                    <h2 className="font-display text-3xl">
                        Find your way around
                    </h2>
                    <p className="mt-2 max-w-2xl text-ink-soft">
                        Each part of the platform has its own page. Start
                        wherever fits your role.
                    </p>
                    <div className="eco mt-8">
                        {ecoCards.map((card) => (
                            <Link
                                key={card.to}
                                to={card.to}
                                className="eco-card"
                            >
                                <h4>{card.title}</h4>
                                <p>{card.description}</p>
                                <span className="go">{card.cta}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
