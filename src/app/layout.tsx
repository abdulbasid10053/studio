import type { Metadata } from 'next';
import Script from 'next/script';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Muzar Eats — Dari Senja Sampai Pagi',
  description: 'Warung Nasi Goreng X Starbag Muzar. Buka dari jam 16.00 sampai 02.00. Pesan via ShopeeFood, GrabFood, GoFood atau datang langsung.',
  themeColor: '#121212',
  openGraph: {
    title: 'Muzar Eats — Dari Senja Sampai Pagi',
    description: 'Nasi goreng anti-mainstream. Buka 16.00–02.00. Klik untuk pesan cepat!',
    type: 'website',
    url: 'https://nasgorxstarbag.example/',
    images: [{ url: 'https://i.imgur.com/1hY6w1B.jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
        {children}
        <Toaster />
        <Script async src="https://www.tiktok.com/embed.js" />
        <Script async src="https://www.instagram.com/embed.js" />
      </body>
    </html>
  );
}
