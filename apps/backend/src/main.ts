import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';

import appOptions from '@config/app.config';
import { environment } from '@config/env.config';

import { AppModule } from '@/app';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);

    const logger = app.get(Logger);

    const { PORT, CLIENT_URL, DATABASE_NAME } = environment();

    app.enableCors({
        origin: CLIENT_URL,
        credentials: true
    });

    await app.listen(PORT);

    const appUrl = (await app.getUrl()).replace('[::1]', 'localhost');

    logger.log(`Connected to the database "${DATABASE_NAME}"`);
    logger.log(`Server listening at port ${appUrl}`);
}

bootstrap()
    .then()
    .catch((error) => {
        console.error(error);
    });
