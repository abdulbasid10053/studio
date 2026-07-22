import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/cashier'],
      },
    ],
    sitemap: 'https://nasgormuzar.my.id/sitemap.xml',
  };
}
