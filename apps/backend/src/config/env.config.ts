import type { ConfigService } from '@nestjs/config';

export interface EnvironmentVariables {
    nodeEnv: 'development' | 'production' | 'test';
    port: number;
    database: {
        user: string;
        user_password: string;
        name: 'rse_dev' | 'rse_prod' | 'rse_test';
        url: string;
    };
    jwtSecret: string;
}

type AnyObject = { [key: string]: unknown };

function checkUnsetVariables(variables: AnyObject): void {
    for (const key in variables) {
        if (variables[key] === undefined || variables[key] === '') {
            throw new Error(`Environment variable "${key.toUpperCase()}" is not set.`);
        }

        if (typeof variables[key] === 'object') {
            checkUnsetVariables(variables[key] as AnyObject);
        }
    }
}

const environment = (configService: ConfigService): EnvironmentVariables => {
    const variables: EnvironmentVariables = {
        nodeEnv: configService.get('NODE_ENV', 'development'),
        port: configService.get('PORT', 3000),
        database: {
            user: configService.get('DATABASE_USER'),
            user_password: configService.get('DATABASE_USER_PASSWORD'),
            name: configService.get('DATABASE_NAME'),
            url: configService.get('DATABASE_URL')
        },
        jwtSecret: configService.get('JWT_SECRET')
    };

    checkUnsetVariables(variables as unknown as AnyObject);

    return variables;
};

export { environment };
