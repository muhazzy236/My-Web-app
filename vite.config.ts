import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // 'host: true' allows the server to be accessible externally (essential for Replit/Docker)
    host: true,
    // We remove the hardcoded port to allow the environment (like Vercel or Replit) 
    // to assign one dynamically if needed, or default to 5173.
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});