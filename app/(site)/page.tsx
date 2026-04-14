import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { TechStackSection } from "@/components/home/TechStackSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { LatestPostsSection } from "@/components/home/LatestPostsSection";
import { client } from "@/sanity/lib/client";
import { getSiteConfig } from "@/sanity/lib/queries";
import { SanitySiteConfig } from "@/lib/types";

export const metadata = {
  title: "Rabin Mishra | DevOps Engineer Portfolio",
  description: "Fresh BE IT graduate passionate about automating infrastructure and cloud systems. Based in Kathmandu.",
};

export default async function HomePage() {
  const config = await client.fetch<SanitySiteConfig | null>(getSiteConfig);

  return (
    <>
      <HeroSection resumeUrl={config?.resumeFileUrl} />
      <StatsBar />
      <TechStackSection />
      <FeaturedProjectsSection />
      <LatestPostsSection />
    </>
  );
}
