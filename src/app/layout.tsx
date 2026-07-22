import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { cn } from '@/lib/utils';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nasgormuzar.my.id'),
  title: 'Muzar Nasgor x Starbag - Nasi Goreng Purworejo',
  description: 'Warung Nasi Goreng X Starbag Muzar di Purworejo. Sajian hidangan api besar (Wok Hei) lezat dari senja sampai pagi (17.00 - 01.00). Pesan via GoFood, GrabFood, ShopeeFood atau datang langsung.',
  keywords: [
    'nasi goreng purworejo',
    'nasgor muzar',
    'muzar nasgor x starbag',
    'kuliner purworejo',
    'kuliner malam purworejo',
    'tempat makan purworejo',
    'street food purworejo',
    'bakmi purworejo',
    'kwetiau purworejo'
  ],
  alternates: {
    canonical: 'https://nasgormuzar.my.id',
  },
  openGraph: {
    title: 'Muzar Nasgor x Starbag - Nasi Goreng Purworejo',
    description: 'Sensasi Nasi Goreng Wok Hei khas Purworejo! Buka setiap hari 17.00–01.00 WIB. Porsi pas, rasa mantap, harga bersahabat.',
    type: 'website',
    url: 'https://nasgormuzar.my.id/',
    siteName: 'Muzar Eats Purworejo',
    locale: 'id_ID',
    images: [
      {
        url: '/image/nasi goreng.webp',
        width: 1200,
        height: 630,
        alt: 'Nasi Goreng X Starbag Muzar Purworejo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muzar Nasgor x Starbag - Nasi Goreng Purworejo',
    description: 'Nasi Goreng & Kuliner Malam Populer di Purworejo. Buka 17.00–01.00 WIB.',
    images: ['/image/nasi goreng.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#121212',
};

// JSON-LD Structured Data untuk Google Local SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Muzar Nasgor x Starbag - Nasi Goreng Purworejo',
  image: 'https://nasgormuzar.my.id/image/nasi%20goreng.webp',
  '@id': 'https://nasgormuzar.my.id',
  url: 'https://nasgormuzar.my.id',
  telephone: '+6281234567890',
  priceRange: '$$',
  menu: 'https://nasgormuzar.my.id/#menu',
  servesCuisine: ['Indonesian', 'Street Food', 'Nasi Goreng', 'Bakmi', 'Capcay'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Kutoarjo - Purworejo',
    addressLocality: 'Purworejo',
    addressRegion: 'Jawa Tengah',
    postalCode: '54111',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -7.7126,
    longitude: 109.9994,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '17:00',
      closes: '01:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/',
    'https://gofood.link/',
    'https://grab.onelink.me/',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn(inter.variable, spaceGrotesk.variable, 'font-body antialiased')} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
