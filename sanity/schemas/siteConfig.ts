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
    defineField({
      name: "roles",
      title: "Hero Roles (Typing Animation)",
      type: "array",
      of: [{ type: "string" }],
      description: "List of roles that animate on the Home page hero section. E.g. DevOps Engineer, Cloud Architect.",
    }),
    defineField({
      name: "terminalLines",
      title: "Hero Terminal Simulator Lines",
      type: "array",
      of: [{ type: "string" }],
      description: "Lines of code or commands displayed sequentially in the home page code terminal simulation block.",
    }),
    defineField({
      name: "stats",
      title: "Homepage Stats Counters",
      type: "array",
      of: [
        {
          type: "object",
          name: "statItem",
          title: "Stat Item",
          fields: [
            { name: "value", title: "Number / Value", type: "string", description: "e.g. '12', '3.8'" },
            { name: "suffix", title: "Suffix Symbol", type: "string", description: "e.g. '+', '/4.0'" },
            { name: "label", title: "Label Description", type: "string", description: "e.g. 'Projects Completed'" },
          ],
        },
      ],
      description: "Interactive counter items displayed in the home page stats bar.",
    }),
    defineField({
      name: "contactHeadline",
      title: "Contact Page Headline",
      type: "string",
    }),
    defineField({
      name: "contactDescription",
      title: "Contact Page Description",
      type: "text",
    }),
    defineField({
      name: "projectsTitle",
      title: "Projects Page Title",
      type: "string",
    }),
    defineField({
      name: "projectsDescription",
      title: "Projects Page Description",
      type: "text",
    }),
    defineField({
      name: "blogTitle",
      title: "Blog Page Title",
      type: "string",
    }),
    defineField({
      name: "blogDescription",
      title: "Blog Page Description",
      type: "text",
    }),
  ],
});
