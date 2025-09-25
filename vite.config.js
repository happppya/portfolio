import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow all CodeSandbox hosts
    allowedHosts: ['.csb.app'],
  },
})
