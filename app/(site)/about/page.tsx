import { AboutHero } from "@/components/about/AboutHero";
import { SkillsGrid } from "@/components/about/SkillsGrid";
import { EducationTimeline } from "@/components/about/EducationTimeline";
import { CertificationsSection } from "@/components/about/CertificationsSection";

export const metadata = {
  title: "About Rabin Mishra",
  description: "Learn more about Rabin Mishra, an IT Engineer and DevOps enthusiast with 18+ certifications and a proven track record. Based in Kathmandu, Nepal.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <SkillsGrid />
      <EducationTimeline />
      <CertificationsSection />
    </>
  );
}
