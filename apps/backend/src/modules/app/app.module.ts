import { Module, NestModule, Logger, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { LoggerModule } from 'nestjs-pino';
import loggerModuleOptions from '@config/logger.config'
import configModuleOptions from '@config/nestjs.config'

@Module({
    imports: [
        LoggerModule.forRoot(loggerModuleOptions),
        ConfigModule.forRoot(configModuleOptions)
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        MorganMiddleware.configure('dev', {
            stream: {
                write: (message) => {
                    return Logger.log(message, MorganMiddleware.name)
                }
            }
        });
        consumer.apply(MorganMiddleware).forRoutes('*');
    }
}
