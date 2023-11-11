import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactIconsFa from 'react-icons/fa';
import { AiOutlineBarChart } from 'react-icons/ai';
import { BsMap, BsFillChatRightTextFill } from 'react-icons/bs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [AiOutlineBarChart, BsMap, BsFillChatRightTextFill,reactIconsFa],
    },
  },
})
