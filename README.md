# sanity-plugin-table-of-contents


A plugin that adds a table of contents inspector to navigate your page builder arrays and portable text in documents, letting you quickly jump to a specific heading or custom block.

## Features

- **Table of contents inspector**: Navigate your portable text in documents and quickly jump to a specific heading or custom block.
- **Customisable**: Choose which types and fields to include in the table of contents.
- **Easy to use**: Simple setup and configuration.
- **Lightweight**: Minimal impact on your Studio's performance.

## Installation

```sh
npm install sanity-plugin-table-of-contents
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import { defineConfig } from 'sanity'
import { tableOfContentsPlugin } from 'sanity-plugin-table-of-contents'

export default defineConfig({
  //...
  plugins: [
    //...
    tableOfContentsPlugin({
      fieldNames: ['content', 'body'], // all array and Portable Text fields that should be included in the TOC
      documentTypes: ['page', 'news'], // add the TOC to specific document types
    }),
  ],
})
```

## License

[MIT](LICENSE) © Saskia Bobinska

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

## Kudos

Thanks to @jordanl17 for his help getting this over the line!

### Release new version

Run ["CI & Release" workflow](https://github.com/bobinska-dev/sanity-plugin-table-of-contents-plugin/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
