import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import iconsPlugin from './vite-plugin-icons';

export default defineConfig({
  plugins: [react(), iconsPlugin],
  build: {
    rollupOptions: {
      external: ['react-icons/fa', 'react-icons/ai', 'react-icons/bs'],
    },
  },
});