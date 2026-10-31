import { Card } from '@/components/Card'
import { RevealGroup, RevealItem } from '@/components/Reveal'
import { partners } from '@/data/partners'

export const PartnerCards = () => (
    <RevealGroup className="grid gap-4 md:grid-cols-3 xl:gap-6">
        {partners.cards.map((card) => (
            <RevealItem key={card.title} className="flex">
                {/* Figma Variant2: the grey lift becomes a green glow; unlike Platform, the title stays dark. */}
                <Card
                    raised
                    className="w-full p-8 transition-shadow duration-200 ease-[ease] hover:shadow-[0_1px_80px_0_rgb(0_91_76/0.2)] xl:p-12"
                >
                    <h3 className="text-h6 font-semibold text-grey-900 md:text-body-lg xl:text-h5">
                        {card.title}
                    </h3>
                    <p className="mt-4 text-body text-grey-600 md:text-body-sm xl:text-body-lg">
                        {card.text}
                    </p>
                </Card>
            </RevealItem>
        ))}
    </RevealGroup>
)
