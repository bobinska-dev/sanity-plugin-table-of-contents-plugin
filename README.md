# sanity-plugin-table-of-contents

> This is a **Sanity Studio v3** plugin.

## * * * * THIS IS NOT INSTALLABLE YET; WORK IN PROGRESS * * * * 

## Installation

```sh
npm install sanity-plugin-table-of-contents
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import { defineConfig } from 'sanity'
import { myPlugin } from 'sanity-plugin-table-of-contents'

export default defineConfig({
  //...
  plugins: [myPlugin({})],
})
```

## License

[MIT](LICENSE) © Saskia Bobinska

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
