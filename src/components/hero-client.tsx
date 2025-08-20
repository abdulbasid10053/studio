"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export function HeroClient() {
  const [status, setStatus] = useState("Mengecek status buka…");
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const formatTimeRemaining = (ms: number) => {
      const totalSeconds = Math.max(0, Math.floor(ms / 1000));
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours}j ${minutes}m ${String(seconds).padStart(1, "0")}d`;
    };

    const updateStatus = () => {
      const now = new Date();
      const h = now.getUTCHours() + 7; // Get current hour in WIB (UTC+7)
      const currentHour = h >= 24 ? h - 24 : h;
      
      const isOpen = (currentHour >= 17 || currentHour < 1);
      
      setStatus(isOpen ? '🔥 BUKA sekarang' : '⏳ TUTUP — siap buka 17.00');
      
      if(isOpen) {
        setCountdown('Sedang buka — ayo pesan sekarang.');
      } else {
        const target = new Date();
        target.setUTCHours(17 - 7, 0, 0, 0); // Target 17:00 WIB today
        if(now.getTime() > target.getTime()) {
          // If it's past 17:00 WIB, target next day's 17:00 WIB
          target.setUTCDate(target.getUTCDate() + 1);
        }
        const ms = target.getTime() - now.getTime();
        setCountdown(`Hitung mundur buka: ${formatTimeRemaining(ms)}`);
      }
    };

    updateStatus();
    const intervalId = setInterval(updateStatus, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="inline-flex items-center gap-2.5 bg-card/5 border border-primary/30 py-2 px-3.5 rounded-full backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-sm">{status}</span>
      </div>

      <h1 className="font-headline font-bold uppercase tracking-wide text-5xl md:text-7xl lg:text-8xl leading-none my-4" style={{ textShadow: '0 0 18px hsl(var(--primary) / 0.30)' }}>
        Nasgor <span className="text-primary">X Starbag</span> Muzar
      </h1>

      <p className="max-w-3xl text-base md:text-lg text-foreground/80">
        Nasi goreng anti-mainstream dengan vibe street food modern. <strong>Buka 17.00 – 01.00 WIB</strong>. Api besar, rasa nendang, porsi jelas.
      </p>
      <p className="mt-1.5 text-primary min-h-6">{countdown}</p>
      
      <div className="flex flex-wrap gap-3 mt-6 mb-8">
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-5 py-3 font-semibold">
          <Link href="#order">Pesan Sekarang</Link>
        </Button>
        <Button asChild variant="secondary" size="lg" className="rounded-xl px-5 py-3 font-semibold">
          <a href="https://maps.app.goo.gl/jRmsDuX9ndY6tQna7?g_st=ipc" target="_blank" rel="noopener">Lihat Lokasi</a>
        </Button>
        <Button asChild variant="secondary" size="lg" className="rounded-xl px-5 py-3 font-semibold">
          <a href="https://www.tiktok.com/@nasgorxstarbag" target="_blank" rel="noopener">TikTok</a>
        </Button>
        <Button asChild variant="secondary" size="lg" className="rounded-xl px-5 py-3 font-semibold">
          <a href="https://www.instagram.com/nasgorxstarbag/" target="_blank" rel="noopener">Instagram</a>
        </Button>
        <Button asChild variant="secondary" size="lg" className="rounded-xl px-5 py-3 font-semibold">
          <a href="https://wa.me/6285123867500" target="_blank" rel="noopener">WhatsApp</a>
        </Button>
      </div>

      <div className="w-full overflow-hidden whitespace-nowrap bg-card/50 border border-primary/30 p-2.5 rounded-lg backdrop-blur-sm shadow-lg">
        <div className="inline-block animate-scroll">
          <span className="mx-4">🔥 Api besar</span>
          <span className="mx-4">🍳 Telur lumer</span>
          <span className="mx-4">🥡 Porsi mantap</span>
          <span className="mx-4">🕓 Buka 17.00–01.00</span>
          <span className="mx-4">🎵 Viral di TikTok & IG</span>
        </div>
        <div className="inline-block animate-scroll" aria-hidden="true">
          <span className="mx-4">🔥 Api besar</span>
          <span className="mx-4">🍳 Telur lumer</span>
          <span className="mx-4">🥡 Porsi mantap</span>
          <span className="mx-4">🕓 Buka 17.00–01.00</span>
          <span className="mx-4">🎵 Viral di TikTok & IG</span>
        </div>
      </div>
    </>
  );
}
