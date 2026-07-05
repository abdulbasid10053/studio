import { MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { Section } from "./section";
import { ShopeeFoodIcon, GrabFoodIcon, GoFoodIcon } from "./icons";

const platforms = [
  { name: "ShopeeFood", href: "https://spf.shopee.co.id/1qRmQ9DPHd", icon: <ShopeeFoodIcon className="w-6 h-6" /> },
  { name: "GrabFood", href: "https://r.grab.com/g/2-1-6-C7DWTPLDGCEZCN", icon: <GrabFoodIcon className="w-6 h-6" /> },
  { name: "GoFood", href: "https://gofood.co.id/kebumen/restaurant/nasi-goreng-nasgor-x-starbag-muzar-jl-kha-dahlan-2265f3c9-9aa3-43bc-8022-c396614a1b73", icon: <GoFoodIcon className="w-6 h-6" /> },
  { name: "Google Maps", href: "https://maps.app.goo.gl/jRmsDuX9ndY6tQna7?g_st=ipc", icon: <MapPin className="w-6 h-6" /> },
];

export function Order() {
  return (
    <Section
      id="order"
      pill="Order"
      title="Pesan sekarang — pilih platform favoritmu"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="bg-card border-white/10 shadow-lg hover:bg-accent/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col items-center justify-center p-6 gap-3 h-full">
                {platform.icon}
                <span className="font-semibold text-center">{platform.name}</span>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </Section>
  );
}
