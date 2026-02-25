import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {tableOfContentsPlugin} from 'sanity-plugin-table-of-contents'

export default defineConfig({
  name: 'default',
  title: 'testing-studio',

  projectId: 'i0otivw3',
  dataset: 'table-of-contents',

  plugins: [
    structureTool(),
    visionTool(),
    tableOfContentsPlugin({
      fieldNames: ['body'],
      documentTypes: ['testDocument'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
