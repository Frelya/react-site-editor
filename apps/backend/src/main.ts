import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';

import appOptions from '@config/app.config';
import { environment } from '@config/env.config';
import { AppModule } from '@modules/app/app.module';
import { User } from '@shared/database';
import { APP_HOST, NodeEnvs } from '@shared/constants';

declare module 'express' {
    interface Request {
        user: User;
    }
}

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);

    const logger = app.get(Logger);
    const configService = app.get(ConfigService);

    const port = environment(configService).port;
    const nodeEnv = environment(configService).nodeEnv;
    const databaseName = environment(configService).database.name;

    await app.listen(port, async () => {
        const getUrl = () => {
            if (nodeEnv === NodeEnvs.PRODUCTION) {
                return `https://${APP_HOST}:${port}`;
            }

            return `http://localhost:${port}`;
        };

        logger.log(`Connected to the database "${databaseName}"`);
        logger.log(`Server listening at ${getUrl()}`);
    });
}

bootstrap().then();
