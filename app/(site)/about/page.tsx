import { AboutHero } from "@/components/about/AboutHero";
import { SkillsGrid } from "@/components/about/SkillsGrid";
import { EducationTimeline } from "@/components/about/EducationTimeline";
import { CertificationsSection } from "@/components/about/CertificationsSection";
import { ResumeDownloadSection } from "@/components/about/ResumeDownloadSection";
import { client } from "@/sanity/lib/client";
import { getSiteConfig } from "@/sanity/lib/queries";
import { SanitySiteConfig } from "@/lib/types";

export const metadata = {
  title: "About Rabin Mishra",
  description: "Learn more about Rabin Mishra, an IT Engineer and DevOps enthusiast with 18+ certifications and a proven track record. Based in Kathmandu, Nepal.",
};

export default async function AboutPage() {
  const config = await client.fetch<SanitySiteConfig | null>(getSiteConfig);

  return (
    <>
      <AboutHero />
      <SkillsGrid />
      <EducationTimeline />
      <CertificationsSection />
      <ResumeDownloadSection resumeUrl={config?.resumeFileUrl} />
    </>
  );
}
