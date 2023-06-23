import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import helmet from 'helmet';
import responseTime from 'response-time';

import nestConfigOptions from '@config/nest.config';
import serveStaticOptions from '@config/static.config';
import { LoggerMiddleware } from '@shared/middlewares';

import { UserModule } from '@modules/user/user.module';

import { AppHostGuard } from './app.guards';
import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot(nestConfigOptions),
        ServeStaticModule.forRoot(serveStaticOptions),
        UserModule
    ],
    providers: [
        Logger,
        {
            provide: APP_GUARD,
            useClass: AppHostGuard
        }
    ],
    controllers: [AppController]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(
                helmet(),
                responseTime({
                    digits: 0
                }),
                LoggerMiddleware
            )
            .forRoutes('*');
    }
}
