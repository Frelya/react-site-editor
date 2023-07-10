import { Module } from '@nestjs/common';

import { DatabaseService } from '@shared/database';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    controllers: [UserController],
    providers: [DatabaseService, UserService]
})
export class UserModule {}
