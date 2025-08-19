import Image from "next/image";
import { Card } from "./ui/card";
import { Section } from "./section";

const bestSellers = [
  {
    name: "Nasgor Spesial",
    description: "Topping Ayam, Sosis, Bakso, Telur Dadar & Ceplok",
    price: "18K",
    image: "/image/nasi goreng.webp",
    aiHint: "special fried rice",
  },
  {
    name: "Nasgor Hongkong",
    description: "Topping Jamur, Jagung, Telur Orak Arik dengan cita rasa gurih asin",
    price: "14K",
    image: "https://i.imgur.com/gY9e5e8.jpeg",
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
      <div className="grid md:grid-cols-2 gap-6">
        {bestSellers.map((item) => (
          <Card key={item.name} className="p-6 bg-card border-white/10 shadow-lg flex items-center gap-5 hover:border-primary/50 transition-colors">
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="rounded-lg object-cover border border-white/10 aspect-square"
              data-ai-hint={item.aiHint}
            />
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="font-headline text-2xl font-bold">{item.name}</h3>
                <span className="font-bold text-primary text-lg">Rp {item.price}</span>
              </div>
              <p className="text-foreground/80 mt-1">{item.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
