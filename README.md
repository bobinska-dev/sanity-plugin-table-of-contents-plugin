# Table of Contents for your Sanity Studio

This is a plugin that adds a table of contents inspector to navigate your page builder arrays and Portable Text in documents, letting you quickly jump to a specific heading or custom block - even for nested Portable Text fields.

<img width="1014" height="801" alt="Screenshot 2025-08-26 at 21 00 18" src="https://github.com/user-attachments/assets/9ba5cb45-bb95-4a71-9b08-e7dc018ce214" />

## Features

- **Table of contents inspector**: Navigate your Portable Text and array fields and quickly jump to a specific heading or block.
- **Click to jump**: Selecting an entry focuses and opens the matching block or array item in the document editor.
- **Nested & embedded fields**: Resolves headings inside nested Portable Text and array items — including Portable Text / array fields embedded within page-builder blocks.
- **Customisable**: Choose which document types and which array / Portable Text fields to include.
- **Translatable**: Ships an English resource bundle and integrates with Studio [i18n](#internationalisation) so you can override or add locales.
- **Lightweight**: Minimal impact on your Studio's performance.

## Compatibility

**2.x** targets Sanity Studio 6 and is the `latest` release; **1.x** stays on Sanity 5 as a maintenance line.

| Plugin version | Sanity Studio  | React | Node    |
| -------------- | -------------- | ----- | ------- |
| **≥ 2.0.0**    | **6.x**        | 19    | ≥ 22.12 |
| 1.0.x          | 5.x (≥ 5.11.0) | 19    | ≥ 18    |

> **Why the split?** Sanity Studio 6 requires **React 19** and **Node ≥ 22.12**. A Studio major means a plugin major, so pin the line that matches your Studio:
>
> ```sh
> # Sanity Studio 6
> npm install sanity-plugin-table-of-contents        # latest (≥ 2.0.0)
> # Sanity Studio 5
> npm install sanity-plugin-table-of-contents@^1
> ```

## Migrating from 1.x

**2.0.0 is a platform bump, not an API change.** The plugin configuration (`fieldNames`, `documentTypes`) is unchanged — there is nothing to rewrite in your `sanity.config`.

2.x targets **Sanity Studio 6** (React 19, Node ≥ 22.12). If you're still on Sanity 5, stay on the `^1` line (see [Compatibility](#compatibility)). Otherwise bump Sanity, React and Node together, then install `sanity-plugin-table-of-contents@^2`.

## Installation

```sh
npm install sanity-plugin-table-of-contents
# or
pnpm add sanity-plugin-table-of-contents
# or
yarn add sanity-plugin-table-of-contents
```

## Usage

Add it as a plugin in `sanity.config.ts` (or `.js`):

```ts
import { defineConfig } from 'sanity'
import { tableOfContentsPlugin } from 'sanity-plugin-table-of-contents'

export default defineConfig({
  //...
  plugins: [
    //...
    tableOfContentsPlugin({
      fieldNames: ['content', 'body'], // array and Portable Text fields to include in the TOC
      documentTypes: ['page', 'news'], // document types that get the TOC inspector
    }),
  ],
})
```

Open a document of one of the configured `documentTypes` and choose **Table of Contents** from the inspector menu (the icons in the top-right of the document pane). The inspector lists the entries found in your configured fields; click one to jump to it in the editor.

### Configuration options

| Option          | Type       | Required | Description                                                                                                                                                            |
| --------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fieldNames`    | `string[]` | yes      | Names of the array and Portable Text fields to build the table of contents from. Fields with these names that are **embedded inside blocks** are resolved too.        |
| `documentTypes` | `string[]` | yes      | Document types the inspector is added to. Documents of other types are left untouched.                                                                               |

> **Note:** `fieldNames` matches by field **name**, so a page-builder array and a Portable Text field can share the plugin, and the same field name nested inside a block (e.g. a Portable Text field inside a page-builder section) is picked up automatically.

## How it works

- The plugin registers a [document inspector](https://www.sanity.io/docs/document-inspectors) for the configured `documentTypes` and contributes its label through the Studio i18n system.
- The inspector reads the live document form state, so entries stay in sync as you edit.
- Each entry resolves a readable title from the block or array item (Portable Text heading text, or an item's title/first text), indented to reflect nesting.
- Clicking an entry focuses and opens the corresponding path in the editor, expanding nested inputs as needed.

## TypeScript support

The plugin is written in TypeScript and exports the config type for consumers:

```ts
import type { TableOfContentsPluginOptions } from 'sanity-plugin-table-of-contents'

const tocConfig: TableOfContentsPluginOptions = {
  fieldNames: ['body'],
  documentTypes: ['page'],
}
```

## Internationalisation

The plugin ships an English resource bundle under the `table-of-contents` namespace and registers it through the Studio [i18n bundles](https://www.sanity.io/docs/localizing-studio) API. To translate the UI (inspector title, close button labels) into another locale, add your own resource bundle for the `table-of-contents` namespace in your Studio's i18n configuration.

## License

[MIT](LICENSE) © Saskia Bobinska

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit) and [@sanity/pkg-utils](https://github.com/sanity-io/pkg-utils) for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio) on how to run this plugin with hotreload in the Studio. This repo also includes a `testing-studio` workspace — run it against the linked plugin with:

```sh
pnpm dev
```

### Package manager

The repo pins its pnpm version through the `packageManager` field in `package.json`, so local development and CI run the exact same pnpm. Enable [Corepack](https://nodejs.org/api/corepack.html) once and your `pnpm` will match automatically:

```sh
corepack enable
```

> Node ships Corepack; if `pnpm` doesn't pick up the pinned version, run `corepack prepare --activate`.
> Bump the version in the `packageManager` field to upgrade — nothing else needs changing.

### Release new version

Releases are automated with [semantic-release](https://github.com/semantic-release/semantic-release) and published to npm via **OIDC trusted publishing** (no npm token needed). Merging [Conventional Commits](https://www.conventionalcommits.org/) into `main` triggers the release: `fix:` → patch, `feat:` → minor, `feat!:` / `BREAKING CHANGE:` → major. Commit messages are linted locally via a Husky `commit-msg` hook.

You can also run the ["CI & Release" workflow](https://github.com/bobinska-dev/sanity-plugin-table-of-contents-plugin/actions/workflows/main.yml) manually from GitHub Actions and check "Release new version". Semantic release only publishes on the configured branches (`main`, `1.x`), so it is safe to run on any branch.

## Kudos

Thanks to [@jordanl17](https://github.com/jordanl17) for his help getting this over the line!
