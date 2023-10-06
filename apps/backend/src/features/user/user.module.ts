import { Module } from '@nestjs/common';

import { ValidationPipe } from '@/pipes';
import { DatabaseService } from '@shared/database';
import { CryptModule } from '@shared/crypt';
import { TokenModule } from '@shared/token';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [CryptModule, TokenModule],
    controllers: [UserController],
    providers: [DatabaseService, UserService, ValidationPipe],
    exports: [UserService]
})
export class UserModule {}
