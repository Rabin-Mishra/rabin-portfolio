import { draftMode } from "next/headers";
import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u6l38s23";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export async function getClient() {
  let isDraft = false;
  try {
    const draft = await draftMode();
    isDraft = draft.isEnabled;
  } catch {
    // Fail-safe when called outside request context (e.g. at static build time)
  }

  if (isDraft) {
    return client.withConfig({
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: "previewDrafts",
      useCdn: false,
    });
  }

  return client;
}
