import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true
        })
    ]
})
export class AppModule {}
