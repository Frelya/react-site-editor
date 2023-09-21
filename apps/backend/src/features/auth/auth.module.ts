import { Module } from '@nestjs/common';

import { CryptModule } from '@shared/crypt';
import { EnvModule } from '@shared/env';
import { TokenModule } from '@features/token';
import { UserModule } from '@features/user';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [CryptModule, EnvModule, TokenModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
