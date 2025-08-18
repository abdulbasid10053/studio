import { AiMenuSuggest } from "@/components/ai-menu-suggest";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Location } from "@/components/location";
import { Menu } from "@/components/menu";
import { Order } from "@/components/order";
import { OrderDock } from "@/components/order-dock";
import { Payment } from "@/components/payment";
import { PromoStory } from "@/components/promo-story";
import { Socials } from "@/components/socials";
import { WhyUs } from "@/components/why-us";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <main>
        <WhyUs />
        <PromoStory />
        <Menu />
        <AiMenuSuggest />
        <Socials />
        <Order />
        <Payment />
        <Location />
      </main>
      <Footer />
      <OrderDock />
    </div>
  );
}
