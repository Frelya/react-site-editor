import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { EnvService } from '@shared/env';

import { TokenService } from './token.service';

@Module({
    imports: [JwtModule],
    providers: [TokenService, EnvService],
    exports: [TokenService]
})
export class TokenModule {}
