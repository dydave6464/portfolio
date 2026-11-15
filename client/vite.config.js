import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { prerenderRoutes } from './scripts/prerender-routes.mjs'

// After every production build, write one HTML file per page with its own
// title, description, and link-preview tags (see scripts/prerender-routes.mjs).
function routeMeta() {
  let outDir
  return {
    name: 'route-meta',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const count = prerenderRoutes(outDir)
      console.log(`route-meta: wrote ${count} page files, sitemap.xml, and robots.txt`)
    },
  }
}

// The /api functions run on Vercel. To run them locally alongside the site,
// use `npx vercel dev` in this folder instead of `npm run dev`.
export default defineConfig({
  plugins: [react(), tailwindcss(), routeMeta()],
  server: {
    port: 5173,
  },
})
