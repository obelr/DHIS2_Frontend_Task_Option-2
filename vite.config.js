import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactIcons from 'react-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [reactIcons],
    },
  },
})
