import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { client } from '@/sanity/lib/client';
import { getSiteConfig } from '@/sanity/lib/queries';
import { SanitySiteConfig } from '@/lib/types';
import { SITE_CONFIG as FALLBACK_CONFIG } from '@/lib/constants';

export default async function SiteLayout({
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

  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      <Navbar config={safeConfig} />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer config={safeConfig} />
    </div>
  );
}
