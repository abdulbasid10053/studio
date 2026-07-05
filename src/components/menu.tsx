import Image from "next/image";
import { Card } from "./ui/card";
import { Section } from "./section";
import { menuCategories } from "./menu.ts";

export function Menu() {
  return (
    <Section
      id="menu"
      pill="Menu Lengkap"
      title="Semua menu yang wajib dicoba"
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
