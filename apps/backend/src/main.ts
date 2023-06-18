import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';
import morgan from 'morgan';

import { AppModule } from '@app/app.module';
import environment from '@config/env.config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
        bodyParser: true
    });

    const configService = app.get(ConfigService);
    const port = environment(configService).port;

    app.use(morgan('dev'));

    await app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

    return app;
}

bootstrap().then(() => {
    console.log('Application started');
});
