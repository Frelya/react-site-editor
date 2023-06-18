import type { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
    nodeEnv: string;
    port: number;
    database: {
        username: string;
        password: string;
        url: string;
    }
}

const environment = (configService: ConfigService): EnvironmentVariables => ({
    nodeEnv: configService.get<string>('NODE_ENV', 'development'),
    port: configService.get<number>('PORT', 3000),
    database: {
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        url: configService.get<string>('DATABASE_URL')
    }
});

export default environment;
