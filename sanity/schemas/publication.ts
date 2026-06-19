import { defineField, defineType } from "sanity";

export default defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "string",
      description: "e.g., 'Rabin Mishra, John Doe'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "venue",
      title: "Conference / Journal / Publisher",
      type: "string",
      description: "e.g., 'IEEE World Forum on Internet of Things'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedDate",
      title: "Publication Date String",
      type: "string",
      description: "e.g., 'June 2026'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "abstract",
      title: "Abstract",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "paperUrl",
      title: "Paper / Publisher Link",
      type: "url",
      description: "Link to DOI, IEEE Xplore, Google Scholar, etc.",
    }),
    defineField({
      name: "pdfFile",
      title: "PDF File",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order for displaying publications (lower comes first)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "venue",
    },
  },
});
