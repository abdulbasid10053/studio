import Image from "next/image";
import { Card } from "./ui/card";
import { Section } from "./section";

const menuCategories = [
  {
    category: "Nasi Goreng",
    image: "https://placehold.co/400x300.png",
    aiHint: "fried rice",
    items: [
      { name: "Ayam (Biasa)", price: "13K" },
      { name: "Bakso", price: "13K" },
      { name: "Sosis", price: "13K" },
      { name: "Magelangan", price: "13K" },
      { name: "Hongkong", price: "14K" },
      { name: "Cumi", price: "15K" },
      { name: "Jumbo", price: "18K" },
      { name: "Mawut", price: "18K" },
      { name: "Ati Ampela", price: "18K" },
      { name: "Spesial", price: "18K" },
      { name: "Istimewa", price: "20K" },
    ],
  },
  {
    category: "Bakmi",
    description: "Goreng / Rebus",
    image: "https://placehold.co/400x300.png",
    aiHint: "fried noodles",
    items: [
      { name: "Ayam (Biasa)", price: "13K" },
      { name: "Bakso", price: "13K" },
      { name: "Sosis", price: "13K" },
      { name: "Spesial", price: "18K" },
      { name: "Jumbo", price: "18K" },
      { name: "Ati Ampela", price: "18K" },
    ],
  },
  {
    category: "Kwetiau",
    description: "Goreng / Rebus",
    image: "https://placehold.co/400x300.png",
    aiHint: "kwetiau noodles",
    items: [
      { name: "Ayam (Biasa)", price: "13K" },
      { name: "Bakso", price: "13K" },
      { name: "Sosis", price: "13K" },
      { name: "Spesial", price: "18K" },
      { name: "Jumbo", price: "18K" },
      { name: "Ati Ampela", price: "18K" },
    ],
  },
  {
    category: "Bihun",
    description: "Goreng / Rebus",
    image: "https://placehold.co/400x300.png",
    aiHint: "bihun noodles",
    items: [
      { name: "Ayam (Biasa)", price: "13K" },
      { name: "Bakso", price: "13K" },
      { name: "Sosis", price: "13K" },
      { name: "Spesial", price: "18K" },
      { name: "Jumbo", price: "18K" },
      { name: "Ati Ampela", price: "18K" },
    ],
  },
];

export function Menu() {
  return (
    <Section
      id="menu"
      pill="Menu Lengkap"
      title="🔥 Favorit sering sold out"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {menuCategories.map((category) => (
          <Card key={category.category} className="p-6 bg-card border-white/10 shadow-lg flex flex-col">
            <div className="flex-grow">
              <div className="flex items-start gap-4 mb-4">
                <Image
                  src={category.image}
                  alt={category.category}
                  width={100}
                  height={75}
                  className="rounded-lg object-cover border border-white/10 aspect-[4/3]"
                  data-ai-hint={category.aiHint}
                />
                <div>
                  <h3 className="font-headline text-2xl font-bold">{category.category}</h3>
                  {category.description && <p className="text-sm text-primary">{category.description}</p>}
                </div>
              </div>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item.name} className="flex justify-between items-baseline gap-2">
                    <span className="text-foreground/90">{item.name}</span>
                    <div className="flex-grow border-b border-dashed border-white/10 mx-2"></div>
                    <span className="font-bold text-primary">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
      <p className="text-foreground/60 mt-6 text-sm text-center">
        Harga & daftar lengkap mengikuti platform pesan online (ShopeeFood/GrabFood/GoFood).
      </p>
    </Section>
  );
}