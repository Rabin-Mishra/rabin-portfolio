import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { TechStackSection } from "@/components/home/TechStackSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { LatestPostsSection } from "@/components/home/LatestPostsSection";
import { PublicationsSection } from "@/components/home/PublicationsSection";
import { getClient } from "@/sanity/lib/client";
import { getSiteConfig, getSkills } from "@/sanity/lib/queries";
import { SanitySiteConfig, SanitySkill } from "@/lib/types";

export const metadata = {
  title: "DevOps & Cloud Infrastructure Portfolio",
  description: "Fresh BE IT graduate passionate about automating infrastructure and cloud systems. Based in Kathmandu, Nepal.",
  alternates: {
    canonical: 'https://rabinmishra.com.np',
  },
};

export default async function HomePage() {
  const dynamicClient = await getClient();
  const [config, skills] = await Promise.all([
    dynamicClient.fetch<SanitySiteConfig | null>(getSiteConfig),
    dynamicClient.fetch<SanitySkill[] | null>(getSkills),
  ]);

  return (
    <>
      <HeroSection config={config} resumeUrl={config?.resumeFileUrl} />
      <StatsBar stats={config?.stats} />
      <TechStackSection skills={skills} />
      <FeaturedProjectsSection />
      <LatestPostsSection />
      <PublicationsSection />
    </>
  );
}
