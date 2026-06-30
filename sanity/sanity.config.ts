import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './schema'
import IframePreview from './components/IframePreview'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u6l38s23'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'rabin-portfolio',
  title: 'Rabin Mishra Portfolio',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      defaultDocumentNode: (S, { schemaType }) => {
        if (schemaType === 'post' || schemaType === 'project') {
          return S.document().views([
            S.view.form(),
            S.view
              .component(IframePreview)
              .title('Preview'),
          ])
        }
        return S.document().views([S.view.form()])
      }
    }),
    visionTool(),
  ],
  schema,
})
