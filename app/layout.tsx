import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { client } from '@/sanity/lib/client';
import { getSiteConfig } from '@/sanity/lib/queries';
import { SanitySiteConfig } from '@/lib/types';
import { SITE_CONFIG as FALLBACK_CONFIG } from '@/lib/constants';

import { PreviewBanner } from '@/components/layout/PreviewBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export async function generateMetadata(): Promise<Metadata> {
  // Fetch from Sanity
  const config = await client.fetch<SanitySiteConfig | null>(getSiteConfig);
  
  // Use fallback if sanity fails or isn't seeded
  const description = config?.shortBio || FALLBACK_CONFIG.description;
  const url = config?.domain || FALLBACK_CONFIG.url;
  const authorName = config?.ownerName || FALLBACK_CONFIG.author;

  return {
    metadataBase: new URL('https://rabinmishra.com.np'),
    alternates: {
      canonical: 'https://rabinmishra.com.np',
    },
    title: {
      template: `${authorName} | %s`,
      default: `${authorName} | DevOps Engineer`,
    },
    description: description,
    verification: {
      google: 'beWfOyhIbkBRg-O5f-0Lbus3yV56niPSYI1HStN-TYs',
    },
    openGraph: {
      title: authorName,
      description: description,
      url: url,
      siteName: `${authorName} Portfolio`,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: authorName,
      description: description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch site config for Navbar/Footer consumption
  const config = await client.fetch<SanitySiteConfig | null>(getSiteConfig);
  
  // Provide robust fallbacks if unseeded
  const safeConfig: SanitySiteConfig = config || {
    _id: "fallback",
    ownerName: FALLBACK_CONFIG.author,
    shortBio: FALLBACK_CONFIG.description,
    email: FALLBACK_CONFIG.email,
    domain: FALLBACK_CONFIG.url,
  };

  // JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: safeConfig.ownerName,
    jobTitle: "IT Engineer | Aspiring DevOps Engineer",
    url: "https://rabinmishra.com.np",
    email: safeConfig.email,
    sameAs: [
      "https://www.linkedin.com/in/rabin-mishra-3782ba214",
      "https://github.com/Rabin-Mishra",
      safeConfig.linkedinUrl,
      safeConfig.githubUrl
    ].filter((val): val is string => Boolean(val))
     .filter((val, index, self) => self.indexOf(val) === index)
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <PreviewBanner />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
