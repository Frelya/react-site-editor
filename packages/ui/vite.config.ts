import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        target: 'esnext'
    },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, 'src')
            },
            {
                find: '@components',
                replacement: resolve(__dirname, 'src/components')
            },
            {
                find: '@utils',
                replacement: resolve(__dirname, 'src/utils')
            },
            {
                find: '@libs',
                replacement: resolve(__dirname, 'libs')
            }
        ]
    }
});
