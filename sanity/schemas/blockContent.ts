import { defineArrayMember, defineField, defineType } from "sanity";

const codeLanguageOptions = [
  { title: "JavaScript", value: "javascript" },
  { title: "TypeScript", value: "typescript" },
  { title: "TSX", value: "tsx" },
  { title: "JSX", value: "jsx" },
  { title: "Python", value: "python" },
  { title: "Bash", value: "bash" },
  { title: "YAML", value: "yaml" },
  { title: "JSON", value: "json" },
  { title: "HTML", value: "html" },
  { title: "CSS", value: "css" },
  { title: "Markdown", value: "markdown" },
  { title: "SQL", value: "sql" },
  { title: "Dockerfile", value: "dockerfile" },
  { title: "Text", value: "text" },
];

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          defineArrayMember({
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              defineField({
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
                initialValue: false,
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      name: "codeBlock",
      title: "Code Block",
      type: "object",
      fields: [
        defineField({
          name: "language",
          title: "Language",
          type: "string",
          initialValue: "typescript",
          options: {
            list: codeLanguageOptions,
            layout: "dropdown",
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "code",
          title: "Code",
          type: "text",
          rows: 12,
          validation: (Rule) => Rule.required(),
        }),
      ],
      preview: {
        select: {
          language: "language",
          code: "code",
        },
        prepare({
          language,
          code,
        }: {
          language?: string;
          code?: string;
        }) {
          return {
            title: language ? `${language} code block` : "Code block",
            subtitle: code ? code.split("\n")[0].slice(0, 80) : "No code yet",
          };
        },
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption (optional)",
        }),
      ],
    }),
    defineArrayMember({
      name: "table",
      title: "Table",
      type: "object",
      fields: [
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            defineArrayMember({
              name: "row",
              title: "Row",
              type: "object",
              fields: [
                defineField({
                  name: "cells",
                  title: "Cells",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                  validation: (Rule) => Rule.required().min(1),
                }),
              ],
              preview: {
                select: {
                  cells: "cells",
                },
                prepare({ cells }: { cells?: string[] }) {
                  return {
                    title: cells?.join(" | ") || "Empty row",
                  };
                },
              },
            }),
          ],
          validation: (Rule) => Rule.required().min(2),
        }),
      ],
      preview: {
        select: {
          rows: "rows",
        },
        prepare({ rows }: { rows?: Array<{ cells?: string[] }> }) {
          const header = rows?.[0]?.cells?.join(" | ") || "Markdown table";
          return {
            title: "Table",
            subtitle: header,
          };
        },
      },
    }),
  ],
});
