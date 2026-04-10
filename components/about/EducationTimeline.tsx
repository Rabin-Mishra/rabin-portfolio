import { client } from "@/sanity/lib/client";
import { getEducation } from "@/sanity/lib/queries";
import { EducationTimelineClient } from "./EducationTimelineClient";
import { SanityEducation } from "@/lib/types";

export async function EducationTimeline() {
  const educations = await client.fetch<SanityEducation[]>(getEducation);
  return <EducationTimelineClient educations={educations} />;
}
