"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // This ensures the year is only rendered on the client after hydration
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="container py-12 text-foreground/70 border-t border-white/5">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-headline font-bold text-lg mb-2 text-foreground">Jam Operasional</h3>
          <p>Setiap hari: <strong>17.00 – 01.00 WIB</strong></p>
          <p>Lokasi: <strong>Jl. KHA Dahlan No.7, Purworejo, Kec. Purworejo, Kabupaten Purworejo, Jawa Tengah 54183</strong></p>
        </div>
        <div>
          <h3 className="font-headline font-bold text-lg mb-2 text-foreground">Ikuti & Kunjungi</h3>
          <ul className="space-y-1">
            <li>TikTok: <a href="https://www.tiktok.com/@nasgorxstarbag" target="_blank" rel="noopener" className="hover:text-primary transition-colors">@nasgorxstarbag</a></li>
            <li>Instagram: <a href="https://www.instagram.com/nasgorxstarbag/" target="_blank" rel="noopener" className="hover:text-primary transition-colors">@nasgorxstarbag</a></li>
            <li>Google Maps: <a href="https://maps.app.goo.gl/jRmsDuX9ndY6tQna7?g_st=ipc" target="_blank" rel="noopener" className="hover:text-primary transition-colors">Nasgor X Starbag Muzar</a></li>
          </ul>
        </div>
        <div>
            <h3 className="font-headline font-bold text-lg mb-2 text-foreground">Untuk Staf</h3>
            <ul className="space-y-1">
                <li><Link href="/cashier" className="hover:text-primary transition-colors">Halaman Kasir</Link></li>
            </ul>
        </div>
      </div>
      <p className="mt-8 pt-8 border-t border-white/5 text-sm text-foreground/50">
        © {year} Muzar Eats (Nasgor X Starbag Muzar).<br /> Build With ♥️
      </p>
    </footer>
  );
}
