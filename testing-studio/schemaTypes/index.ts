import {defineField, defineType} from 'sanity'

export const schemaTypes = [
  defineType({
    name: 'testDocument',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: 'Title',
      }),
      defineField({
        name: 'body',
        type: 'array',
        title: 'Body',
        of: [{type: 'block'}],
      }),
    ],
  }),
]
