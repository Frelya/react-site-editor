/// <reference types="vite/client" />
declare module 'envConfig';

interface ImportMetaEnv {
    readonly APP_NODE_ENV: 'development' | 'production' | 'test';
    readonly APP_PORT: string;
    readonly APP_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
