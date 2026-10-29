import { Card } from '@/components/Card'
import { RevealGroup, RevealItem } from '@/components/Reveal'
import { partners } from '@/data/partners'

export const PartnerCards = () => (
    <RevealGroup className="grid gap-4 md:grid-cols-3 xl:gap-6">
        {partners.cards.map((card) => (
            <RevealItem key={card.title} className="flex">
                <Card raised className="w-full p-8 xl:p-12">
                    <h3 className="text-h6 font-semibold text-grey-900 md:text-body-lg xl:text-h5">
                        {card.title}
                    </h3>
                    <p className="mt-4 text-body text-grey-600 md:mt-3 md:text-body-sm xl:text-body-lg">
                        {card.text}
                    </p>
                </Card>
            </RevealItem>
        ))}
    </RevealGroup>
)
