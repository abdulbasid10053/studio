import Image from "next/image";
import { Card } from "./ui/card";
import { Section } from "./section";

const bestSellers = [
  {
    name: "Nasgor Spesial",
    description: "Topping Ayam, Sosis, Bakso, Telur Dadar & Ceplok",
    price: "20K",
    image: "/image/nasi goreng.webp",
    aiHint: "special fried rice",
  },
  {
    name: "Nasgor Hongkong",
    description: "Topping Jamur, Jagung, Telur Orak Arik dengan cita rasa gurih asin",
    price: "16K",
    image: "/image/nasi goreng.webp",
    aiHint: "hongkong fried rice",
  },
];

export function BestSeller() {
  return (
    <Section
      id="best-seller"
      pill="Menu Singkat"
      title="🔥 Favorit sering sold out"
    >
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-3 scrollbar-none md:grid md:grid-cols-2 md:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {bestSellers.map((item) => (
          <Card key={item.name} className="flex-shrink-0 w-[82vw] max-w-[340px] md:w-auto snap-center p-4 sm:p-6 bg-card border-border shadow-lg flex items-center gap-4 sm:gap-5 hover:border-primary/50 transition-colors">
            <Image
              src={item.image}
              alt={item.name}
              width={90}
              height={90}
              className="rounded-lg object-cover border border-border aspect-square flex-shrink-0"
              data-ai-hint={item.aiHint}
            />
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-headline text-lg sm:text-2xl font-bold truncate">{item.name}</h3>
                <span className="font-bold text-primary text-base sm:text-lg flex-shrink-0">Rp {item.price}</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/80 mt-1 line-clamp-2">{item.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
