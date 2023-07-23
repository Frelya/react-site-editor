import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvService } from './env.service';

@Module({
    providers: [EnvService],
    exports: [EnvService]
})
export class EnvModule extends ConfigModule {}
