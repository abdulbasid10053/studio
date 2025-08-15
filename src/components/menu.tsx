import Image from "next/image";
import { Card } from "./ui/card";
import { Section } from "./section";

const menuItems = [
  {
    name: "Nasgor Spesial",
    description: "Toping Ayam, Sosis, Bakso, Telur Dadar & Ceplok",
    price: "Rp 18K",
    image: "https://placehold.co/128x128.png",
    aiHint: "special fried rice"
  },
  {
    name: "Nasgor Hongkong",
    description: "Toping Jamur, Jagung, Telur Orak Arik dengan cita rasa gurih asin",
    price: "Rp 14K",
    image: "https://placehold.co/128x128.png",
    aiHint: "hong kong fried rice"
  },
];

export function Menu() {
  return (
    <Section
      id="menu"
      pill="Menu Singkat"
      title="🔥 Favorit sering sold out"
    >
      <div className="grid md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Card key={item.name} className="p-4 bg-card border-white/10 shadow-lg flex items-center gap-4">
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="rounded-lg object-cover border border-white/10"
              data-ai-hint={item.aiHint}
            />
            <div className="flex-grow">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-sm text-foreground/70">{item.description}</p>
            </div>
            <div className="font-extrabold text-primary text-lg whitespace-nowrap">
              {item.price}
            </div>
          </Card>
        ))}
      </div>
      <p className="text-foreground/60 mt-4 text-sm">
        Harga & daftar lengkap mengikuti platform pesan online (ShopeeFood/GrabFood/GoFood).
      </p>
    </Section>
  );
}
