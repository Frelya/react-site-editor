import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // To resolve the top-level await problem
    build: {
        target: 'esnext'
    }
});
