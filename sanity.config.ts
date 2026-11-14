import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'jf7k2yuf'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'CCSA Blog Studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('All Posts')
              .child(
                S.documentList()
                  .title('All Posts')
                  .filter('_type == "post"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Published')
              .child(
                S.documentList()
                  .title('Published Posts')
                  .filter('_type == "post" && isPublished == true && isDraft == false')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Drafts')
              .child(
                S.documentList()
                  .title('Drafts')
                  .filter('_type == "post" && isDraft == true')
              ),
            S.listItem()
              .title('Featured')
              .child(
                S.documentList()
                  .title('Featured Posts')
                  .filter('_type == "post" && isFeatured == true')
              ),
            S.divider(),
            S.listItem()
              .title('Categories')
              .child(S.documentTypeList('category').title('Categories')),
            S.listItem()
              .title('Authors')
              .child(S.documentTypeList('author').title('Authors')),
            S.divider(),
            S.listItem()
              .title('Careers — All Positions')
              .child(
                S.documentList()
                  .title('All Positions')
                  .filter('_type == "jobPosting"')
                  .defaultOrdering([
                    { field: 'closingDate', direction: 'asc' },
                    { field: 'order', direction: 'asc' },
                  ])
              ),
            S.listItem()
              .title('Careers — Open')
              .child(
                S.documentList()
                  .title('Open Positions')
                  .filter('_type == "jobPosting" && isDraft != true && (!defined(closingDate) || closingDate >= now())')
                  .defaultOrdering([
                    { field: 'closingDate', direction: 'asc' },
                    { field: 'order', direction: 'asc' },
                  ])
              ),
            S.listItem()
              .title('Careers — Closed')
              .child(
                S.documentList()
                  .title('Closed Positions')
                  .filter('_type == "jobPosting" && isDraft != true && defined(closingDate) && closingDate < now()')
                  .defaultOrdering([
                    { field: 'closingDate', direction: 'desc' },
                    { field: 'order', direction: 'asc' },
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
