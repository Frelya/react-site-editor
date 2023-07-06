import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvService } from './env.service';

@Module({
    providers: [EnvService]
})
export class EnvModule extends ConfigModule {}
