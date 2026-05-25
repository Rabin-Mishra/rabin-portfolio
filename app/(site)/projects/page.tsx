import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { SanityProject, SanitySiteConfig } from "@/lib/types";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { getSiteConfig } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Projects | Rabin Mishra",
  description: "Explore my latest cloud infrastructure, CI/CD pipelines, and software development projects.",
};

const getProjectsQuery = `*[_type == "project"] | order(featured desc, order asc) {
  "id": _id, title, "slug": slug.current, description, techStack, githubUrl, liveUrl, coverImage, featured, order
}`;

export default async function ProjectsPage() {
  const [projects, config] = await Promise.all([
    client.fetch<SanityProject[]>(getProjectsQuery),
    client.fetch<SanitySiteConfig | null>(getSiteConfig),
  ]);

  const title = config?.projectsTitle ?? "Featured & Past Projects";
  const description = config?.projectsDescription ?? "A showcase of my hands-on experience building, deploying, and managing modern scalable systems and infrastructure over the years.";

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 lg:py-24">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-textPrimary">
          {title}
        </h1>
        <p className="text-lg text-textMuted leading-relaxed">
          {description}
        </p>
      </div>
      
      <ProjectGrid projects={projects} />
    </div>
  );
}
