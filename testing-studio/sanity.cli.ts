import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'i0otivw3',
    dataset: 'table-of-contents',
  },
  server: {
    port: 3335,
  },
  deployment: {autoUpdates: true},
  reactStrictMode: true,
  reactCompiler: {target: '19'},
})
