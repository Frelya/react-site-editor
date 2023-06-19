import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import helmet from 'helmet';
import responseTime from 'response-time';

import { LoggerMiddleware } from '@middlewares/logger.middleware';
import nestConfigOptions from '@config/nest.config';

@Module({
    imports: [ConfigModule.forRoot(nestConfigOptions)],
    providers: [Logger]
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
