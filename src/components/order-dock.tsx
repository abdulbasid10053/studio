"use client";

import Link from "next/link";
import { ShoppingBag, Bike, Utensils, Clock } from "lucide-react";
import { Button } from "./ui/button";

export function OrderDock() {
  return (
    <aside className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2">
      <Button asChild className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-5">
        <Link href="#order">
          <Clock className="w-5 h-5 mr-2" /> Pesan Cepat
        </Link>
      </Button>
      <div className="flex flex-col items-end gap-2 pl-6">
        <a href="https://spf.shopee.co.id/1qRmQ9DPHd" target="_blank" rel="noopener" className="flex items-center gap-2 bg-card/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 text-sm font-medium hover:bg-accent/20 transition-colors shadow-md">
          <ShoppingBag className="w-4 h-4 text-orange-500" /> ShopeeFood
        </a>
        <a href="https://r.grab.com/g/2-1-6-C7DWTPLDGCEZCN" target="_blank" rel="noopener" className="flex items-center gap-2 bg-card/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 text-sm font-medium hover:bg-accent/20 transition-colors shadow-md">
          <Bike className="w-4 h-4 text-green-500" /> GrabFood
        </a>
        <a href="https://gofood.co.id/kebumen/restaurant/nasi-goreng-nasgor-x-starbag-muzar-jl-kha-dahlan-2265f3c9-9aa3-43bc-8022-c396614a1b73" target="_blank" rel="noopener" className="flex items-center gap-2 bg-card/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 text-sm font-medium hover:bg-accent/20 transition-colors shadow-md">
          <Utensils className="w-4 h-4 text-red-500" /> GoFood
        </a>
      </div>
    </aside>
  );
}
