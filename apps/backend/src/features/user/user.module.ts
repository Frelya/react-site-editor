import { Module } from '@nestjs/common';

import { ValidationPipe } from '@/pipes';
import { DatabaseService } from '@shared/database';
import { CryptModule } from '@shared/crypt';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [CryptModule],
    controllers: [UserController],
    providers: [DatabaseService, UserService, ValidationPipe],
    exports: [UserService]
})
export class UserModule {}
