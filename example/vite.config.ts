import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // Set base path for GitHub Pages deployment
  base: '/agent-sdk-vue', // <-- IMPORTANT: Change to your repository name!
  plugins: [vue()],
})
