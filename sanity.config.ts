import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schema'
import IframePreview from './sanity/components/IframePreview'

export default defineConfig({
  name: 'rabin-portfolio',
  title: 'Rabin Mishra Portfolio',
  projectId: 'u6l38s23',
  dataset: 'production',
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
