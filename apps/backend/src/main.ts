import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import appOptions from '@config/app.config';
import { environment, isProduction } from '@config/env.config';
import { APP_HOST } from '@shared/constants';

import { AppModule } from '@/app';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);

    app.useGlobalPipes(new ValidationPipe());

    const logger = app.get(Logger);

    const { PORT, DATABASE_NAME } = environment();

    await app.listen(PORT, async () => {
        const getUrl = () => {
            if (isProduction()) {
                return `https://${APP_HOST}:${PORT}`;
            }

            return `http://localhost:${PORT}`;
        };

        logger.log(`Connected to the database "${DATABASE_NAME}"`);
        logger.log(`Server listening at ${getUrl()}`);
    });
}

bootstrap().then();
