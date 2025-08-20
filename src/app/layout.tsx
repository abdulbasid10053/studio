import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Muzar Eats — Dari Senja Sampai Pagi',
  description: 'Warung Nasi Goreng X Starbag Muzar di Purworejo. Buka dari jam 17.00 sampai 01.00. Pesan via ShopeeFood, GrabFood, GoFood atau datang langsung.',
  keywords: 'nasi goreng purworejo, kuliner purworejo, nasgor x starbag muzar, nasgor muzar, tempat makan malam purworejo, street food purworejo, purworejofoods, jajan purworejo',
  openGraph: {
    title: 'Muzar Eats — Nasi Goreng Anti-Mainstream di Purworejo',
    description: 'Nasi goreng dengan vibe street food modern. Buka 17.00–01.00. Api besar, rasa nendang, porsi jelas. Klik untuk pesan cepat!',
    themeColor: '#121212',
    type: 'website',
    url: 'https://nasgormuzar.my.id/',
    images: [{ url: '/image/nasi goreng.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#121212',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')} suppressHydrationWarning>
        {children}
        <Toaster />
        <Script async src="https://www.tiktok.com/embed.js" />
        <Script async src="https://www.instagram.com/embed.js" />
      </body>
    </html>
  );
}
