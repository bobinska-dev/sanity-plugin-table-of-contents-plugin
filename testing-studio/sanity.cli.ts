import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: 'table-of-contents',
  },
  server: {
    port: 3335,
  },
  deployment: {autoUpdates: true},
  reactStrictMode: true,
  reactCompiler: {target: '19'},
})
