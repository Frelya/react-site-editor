import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        // alias: {
        //     '@': resolve(__dirname, 'src')
        // }
        alias: [
            {
                find: '@components',
                replacement: resolve(__dirname, 'src/components')
            },
            {
                find: '@assets',
                replacement: resolve(__dirname, 'src/assets')
            },
            {
                find: '@views',
                replacement: resolve(__dirname, 'src/views')
            },
            {
                find: '@hooks',
                replacement: resolve(__dirname, 'src/hooks')
            },
            {
                find: '@ui',
                replacement: '@react-site-editor/ui'
            }
        ]
    }
});
