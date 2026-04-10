import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { SanityProject } from "@/lib/types";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects | Rabin Mishra",
  description: "Explore my latest cloud infrastructure, CI/CD pipelines, and software development projects.",
};

const getProjectsQuery = `*[_type == "project"] | order(featured desc, order asc) {
  "id": _id, title, "slug": slug.current, description, techStack, githubUrl, liveUrl, coverImage, featured, order
}`;

export default async function ProjectsPage() {
  const projects = await client.fetch<SanityProject[]>(getProjectsQuery);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 lg:py-24">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-textPrimary">
          Featured & Past Projects
        </h1>
        <p className="text-lg text-textMuted leading-relaxed">
          A showcase of my hands-on experience building, deploying, and managing modern scalable systems and infrastructure over the years.
        </p>
      </div>
      
      <ProjectGrid projects={projects} />
    </div>
  );
}
