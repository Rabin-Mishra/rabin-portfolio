import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/studio/', '/admin/'],
    },
    sitemap: 'https://rabinmishra.com.np/sitemap.xml',
  };
}
