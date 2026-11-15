import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The /api functions run on Vercel. To run them locally alongside the site,
// use `npx vercel dev` in this folder instead of `npm run dev`.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
})
