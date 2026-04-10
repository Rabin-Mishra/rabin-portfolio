import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u6l38s23";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [structureTool()],
});
