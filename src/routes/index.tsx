import { Link, createFileRoute } from '@tanstack/react-router'
import { ecoCards } from '@/data/eco-cards'

export const Route = createFileRoute('/')({
    component: IndexComponent,
})

function IndexComponent() {
    return (
        <main>
            <section className="hero-gradient-dark py-16 text-white">
                <div className="wrap">
                    <h1 className="font-display text-4xl md:text-5xl">
                        Welcome Home!
                    </h1>
                    <p className="mt-4 max-w-2xl text-white/80">
                        The property platform for Nigeria — rent, leases,
                        maintenance, estate governance and tenant rent financing
                        in one place.
                    </p>
                </div>
            </section>

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
