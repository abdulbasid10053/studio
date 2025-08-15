"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ShoppingBag, Bike, Utensils, Clock, Play, Pause } from "lucide-react";
import { Button } from "./ui/button";

export function OrderDock() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="https://syaridesign.com/wp-content/uploads/2023/06/ana-jabini.mp3" loop />
      <aside className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2">
        <Button 
          onClick={togglePlay} 
          className="rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground h-12 w-12 p-0"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
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
    </>
  );
}
