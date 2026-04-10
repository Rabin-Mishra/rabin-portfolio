import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteConfig",
  title: "Site Configuration",
  type: "document",
  // @ts-ignore
  __experimental_actions: ["update", "publish"], // singleton
  fields: [
    defineField({
      name: "ownerName",
      title: "Owner Name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
    }),
    defineField({
      name: "longBio",
      title: "Long Bio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "domain",
      title: "Domain URL",
      type: "url",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image Fallback",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "resumeFile",
      title: "Resume PDF",
      type: "file",
      options: { accept: "application/pdf" },
    }),
  ],
});
