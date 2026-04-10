import { defineField, defineType } from "sanity";

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Cloud & Infrastructure", value: "Cloud & Infrastructure" },
          { title: "CI/CD & Automation", value: "CI/CD & Automation" },
          { title: "OS & Networking", value: "OS & Networking" },
          { title: "Dev & Tools", value: "Dev & Tools" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "proficiencyLevel",
      title: "Proficiency Level (1-5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "icon",
      title: "Icon Slug",
      description: "SimpleIcons slug (e.g. 'amazonaws', 'docker')",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
    },
  },
});
