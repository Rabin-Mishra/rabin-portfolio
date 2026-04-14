import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schema'

export default defineConfig({
  name: 'rabin-portfolio',
  title: 'Rabin Mishra Portfolio',
  projectId: 'u6l38s23',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema,
})
