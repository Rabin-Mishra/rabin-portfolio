import { client } from "@/sanity/lib/client";
import { getSkills } from "@/sanity/lib/queries";
import { SkillsGridClient } from "./SkillsGridClient";
import { SanitySkill } from "@/lib/types";

export async function SkillsGrid() {
  const skills = await client.fetch<SanitySkill[]>(getSkills);
  return <SkillsGridClient skills={skills} />;
}
