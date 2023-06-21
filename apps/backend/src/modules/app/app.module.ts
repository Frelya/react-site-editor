import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import helmet from 'helmet';
import responseTime from 'response-time';

import nestConfigOptions from '@config/nest.config';
import { LoggerMiddleware } from '@shared/middlewares';

import { AppHostGuard } from './app.guards';

@Module({
    imports: [ConfigModule.forRoot(nestConfigOptions)],
    providers: [
        Logger,
        {
            provide: APP_GUARD,
            useClass: AppHostGuard
        }
    ]
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
