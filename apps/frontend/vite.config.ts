import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@assets',
                replacement: resolve(__dirname, 'src/assets')
            },
            {
                find: '@components',
                replacement: resolve(__dirname, 'src/components')
            },
            {
                find: '@views',
                replacement: resolve(__dirname, 'src/views')
            },
            {
                find: '@ui',
                replacement: '@react-site-editor/ui'
            }
        ]
    }
});
