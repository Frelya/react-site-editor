import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@assets',
                replacement: '@react-site-editor/frontend/src/assets'
            },
            {
                find: '@components',
                replacement: '@react-site-editor/frontend/src/components'
            },
            {
                find: '@pages',
                replacement: '@react-site-editor/frontend/src/pages'
            }
        ]
    }
});
