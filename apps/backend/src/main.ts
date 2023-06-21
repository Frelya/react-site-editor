import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';

import appOptions from '@config/app.config';
import { environment } from '@config/env.config';
import { AppModule } from '@modules/app/app.module';
import { User } from '@shared/database';

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

    await app.listen(port, () => {
        if (environment(configService).nodeEnv === 'development') {
            logger.log(`Server listening at http://localhost:${port}/`);
        }
    });

    return { logger, configService };
}

bootstrap().then(({ logger, configService }) => {
    const databaseName = environment(configService).database.name;

    logger.log(`Connected to the database "${databaseName}"`);
});
