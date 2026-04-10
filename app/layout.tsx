import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SITE_CONFIG } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    template: `Rabin Mishra | %s`,
    default: "Rabin Mishra | DevOps Engineer",
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: "Rabin Mishra",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: "Rabin Mishra Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rabin Mishra",
    description: SITE_CONFIG.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rabin Mishra",
    jobTitle: "IT Engineer | Aspiring DevOps Engineer",
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.email,
    sameAs: [
      "https://github.com/Rabin-Mishra",
      "https://www.linkedin.com/in/rabin-mishra-3782ba214"
    ]
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
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
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
