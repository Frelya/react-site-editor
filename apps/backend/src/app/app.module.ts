import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import helmet from 'helmet';
import responseTime from 'response-time';

import { envConfigOptions } from '@config/env.config';
import { serveStaticOptions } from '@config/static.config';
import { LoggerMiddleware } from '@shared/middlewares';
import { EnvModule, EnvService } from '@shared/env';
import { UserModule } from '@features/user/user.module';
import { AllExceptionsFilter } from '@/filters';
import { ResponseInterceptor } from '@/interceptors';
import { TimeoutInterceptor } from '@/interceptors';
import { ValidationPipe } from '@/pipes';

import { AppHostGuard } from './app.guards';
import { AppController } from './app.controller';

@Module({
    imports: [
        EnvModule.forRoot(envConfigOptions),
        ServeStaticModule.forRoot(serveStaticOptions),
        UserModule
    ],
    providers: [
        Logger,
        EnvService,
        {
            provide: APP_GUARD,
            useClass: AppHostGuard
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter
        },
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
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
