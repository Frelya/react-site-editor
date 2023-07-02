import type { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

type AnyObject = { [key: string]: unknown };

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
    }
}

const envVariablesSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().default('3000'),
    DATABASE_USER: z.string(),
    DATABASE_USER_PASSWORD: z.string(),
    DATABASE_NAME: z.enum(['rse_dev', 'rse_prod', 'rse_test']).default('rse_dev'),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
});

const variables = envVariablesSchema.parse(process.env);

function isDevelopment(): boolean {
    return variables.NODE_ENV === 'development';
}

function isProduction(): boolean {
    return variables.NODE_ENV === 'production';
}

function isTest(): boolean {
    return variables.NODE_ENV === 'test';
}

function checkUnsetVariables(variables: AnyObject): void {
    Object.entries(variables).forEach(([key, value]) => {
        if (value === undefined || value === '') {
            throw new Error(`Environment variable ${key} is not set`);
        }
    });
}

const environment = () => {
    checkUnsetVariables(variables as unknown as AnyObject);
    return variables;
};

const envConfigOptions: ConfigModuleOptions = {
    cache: true,
    isGlobal: true,
    load: [environment]
};

export {
    isDevelopment,
    isProduction,
    isTest,
    environment,
    envConfigOptions
};
