import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores([
    '**/*.js',
    '**/.eslintrc.js',
    '**/commitlint.config.js',
    '**/dist',
    '**/lint-staged.config.js',
    '**/package.config.ts',
  ]),
  {
    extends: fixupConfigRules(
      compat.extends(
        'sanity',
        'sanity/typescript',
        'sanity/react',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:react/jsx-runtime',
      ),
    ),

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
])
