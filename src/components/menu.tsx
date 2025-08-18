import Image from "next/image";
import { Card } from "./ui/card";
import { Section } from "./section";

const menuCategories = [
  {
    category: "Nasi Goreng",
    image: "/image/nasi goreng.webp",
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
    image: "/image/bakmi.webp",
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
    image: "/image/kwetiaw.webp",
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
    image: "/image/bihun.webp",
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
  {
    category: "Capcay",
    image: "/image/capcay.webp",
    aiHint: "capcay vegetables",
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
    category: "Topping",
    image: "/image/nasi goreng.webp",
    aiHint: "fried egg",
    items: [
      { name: "Telur Dadar", price: "4K" },
      { name: "Telur Ceplok Mata Sapi", price: "4K" },
      { name: "Sosis", price: "1K" },
      { name: "Bakso", price: "1K" },
    ],
  },
  {
    category: "Minuman",
    description: "Es / Panas",
    image: "/image/minuman.webp",
    aiHint: "iced drinks",
    items: [
        { name: "Teh", price: "3K" },
        { name: "Jeruk", price: "3K" },
        { name: "Lemon", price: "4K" },
        { name: "Nutrisari", price: "4K" },
        { name: "Segar Dingin", price: "4K" },
        { name: "Susu Coklat/Putih", price: "4K" },
        { name: "Good Day", price: "4K" },
        { name: "Indocafe Coffeemix", price: "4K" },
        { name: "Luwak Whitecoffee", price: "4K" },
        { name: "Torabika Cappuccino", price: "4K" },
        { name: "Nescafe Clasic", price: "4K" },
        { name: "Kopi Kapal Api", price: "4K" },
        { name: "Jahe", price: "4K" },
        { name: "Jahe Susu", price: "4K" },
        { name: "Lemontea", price: "4K" },
        { name: "Teh Susu", price: "4K" },
        { name: "Milo", price: "4K" },
        { name: "Chocolatos", price: "4K" },
    ]
  }
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
          <Card key={category.category} className="p-6 bg-card border-white/10 shadow-lg flex flex-col hover:border-primary/50 transition-colors">
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
