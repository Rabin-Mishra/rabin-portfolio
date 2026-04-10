import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';
import { client } from '@/sanity/lib/client';
import { getSiteConfig } from '@/sanity/lib/queries';
import { SanitySiteConfig } from '@/lib/types';
import { SITE_CONFIG as FALLBACK_CONFIG } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export async function generateMetadata(): Promise<Metadata> {
  // Fetch from Sanity
  const config = await client.fetch<SanitySiteConfig | null>(getSiteConfig);
  
  // Use fallback if sanity fails or isn't seeded
  const description = config?.shortBio || FALLBACK_CONFIG.description;
  const url = config?.domain || FALLBACK_CONFIG.url;
  const authorName = config?.ownerName || FALLBACK_CONFIG.author;

  return {
    title: {
      template: `${authorName} | %s`,
      default: `${authorName} | DevOps Engineer`,
    },
    description: description,
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
    url: safeConfig.domain,
    email: safeConfig.email,
    sameAs: [
      safeConfig.githubUrl,
      safeConfig.linkedinUrl
    ].filter(Boolean)
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen flex flex-col bg-background text-textPrimary antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar config={safeConfig} />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer config={safeConfig} />
        </ThemeProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
