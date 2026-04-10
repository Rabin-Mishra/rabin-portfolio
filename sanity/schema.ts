import { type SchemaTypeDefinition } from "sanity";
import post from "./schemas/post";
import project from "./schemas/project";
import category from "./schemas/category";
import author from "./schemas/author";
import education from "./schemas/education";
import certification from "./schemas/certification";
import skill from "./schemas/skill";
import siteConfig from "./schemas/siteConfig";
import workExperience from "./schemas/workExperience";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    project,
    category,
    author,
    education,
    certification,
    skill,
    siteConfig,
    workExperience
  ],
};
