import createImageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u6l38s23";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: any) => {
  return imageBuilder?.image(source).auto("format").fit("max");
};
