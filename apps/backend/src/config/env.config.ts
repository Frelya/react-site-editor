import type { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
    nodeEnv: 'development' | 'production' | 'test';
    port: number;
    database: {
        username: string;
        password: string;
        name: 'rse_dev' | 'rse_prod' | 'rse_test';
        url: string;
    }
}

const environment = (configService: ConfigService): EnvironmentVariables => ({
    nodeEnv: configService.get('NODE_ENV', 'development'),
    port: configService.get('PORT', 3000),
    database: {
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        name: configService.get('DATABASE_NAME'),
        url: configService.get('DATABASE_URL')
    }
});

export default environment;
