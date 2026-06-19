import { client } from "@/sanity/lib/client";
import { getEducation } from "@/sanity/lib/queries";
import { EducationTimelineClient } from "./EducationTimelineClient";
import { SanityEducation } from "@/lib/types";
import { urlForImage } from "@/sanity/lib/image";

export async function EducationTimeline() {
  const educations = await client.fetch<SanityEducation[]>(getEducation);
  
  const educationsWithUrls = educations.map((edu) => ({
    ...edu,
    logoUrl: edu.institutionLogo ? urlForImage(edu.institutionLogo).url() : undefined,
  }));

  return <EducationTimelineClient educations={educationsWithUrls} />;
}
