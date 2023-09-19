import { defineConfig, loadEnv } from 'vite';
import type { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default ({ mode }: UserConfig) => {
    if (!mode) {
        throw new Error('App running mode is undefined');
    }

    process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

    return defineConfig({
        envPrefix: 'APP_',
        server: {
            port: parseInt(process.env.APP_PORT || '5173')
        },
        plugins: [react()],
        build: {
            target: 'esnext',
            outDir: './dist'
        },
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: resolve(__dirname, '/src')
                },
                {
                    find: '@assets',
                    replacement: resolve(__dirname, '/src/assets')
                },
                {
                    find: '@components',
                    replacement: resolve(__dirname, '/src/components')
                },
                {
                    find: '@contexts',
                    replacement: resolve(__dirname, '/src/contexts')
                },
                {
                    find: '@plugins',
                    replacement: resolve(__dirname, '/src/plugins')
                },
                {
                    find: '@router',
                    replacement: resolve(__dirname, '/src/router')
                },
                {
                    find: '@store',
                    replacement: resolve(__dirname, '/src/store')
                },
                {
                    find: '@views',
                    replacement: resolve(__dirname, '/src/views')
                }
            ]
        }
    });
};
