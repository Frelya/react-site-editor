import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';

import { AppModule } from '@modules/app/app.module';
import appOptions from '@config/app.config';
import environment from '@config/env.config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);

    app.useLogger(app.get(Logger));

    const configService = app.get(ConfigService);
    const port = environment(configService).port;

    await app.listen(port, () => {
        if (environment(configService).nodeEnv === 'development') {
            console.log(`Server listening at http://localhost:${port} \n`);
        }
    });

    return app;
}

bootstrap().then(() => {});
