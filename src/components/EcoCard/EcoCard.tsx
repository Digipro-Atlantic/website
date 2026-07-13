import { Link } from '@tanstack/react-router'
import type { EcoCard as EcoCardData } from '@/data/types'

type EcoCardProps = {
    card: EcoCardData
    className?: string
}

export const EcoCard = ({ card, className = '' }: EcoCardProps) => (
    <Link to={card.to} className={`eco-card ${className}`.trim()}>
        <h4>{card.title}</h4>
        <p>{card.description}</p>
        <span className="go">{card.cta}</span>
    </Link>
)
