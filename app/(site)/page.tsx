import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { TechStackSection } from "@/components/home/TechStackSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { LatestPostsSection } from "@/components/home/LatestPostsSection";

export const metadata = {
  title: "Rabin Mishra | DevOps Engineer Portfolio",
  description: "Fresh BE IT graduate passionate about automating infrastructure and cloud systems. Based in Kathmandu.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <TechStackSection />
      <FeaturedProjectsSection />
      <LatestPostsSection />
    </>
  );
}
