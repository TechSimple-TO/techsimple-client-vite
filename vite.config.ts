import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // <-- repo name
});
// This configuration sets up Vite for a React project with the base path set to the repository name.