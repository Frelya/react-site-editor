import { Injectable } from '@nestjs/common';

import { DatabaseService, User } from '@shared/database';

import { GetUserByIdDto } from './dtos/get-user-by-id.dto';

@Injectable()
export class UserService {
    constructor(private readonly database: DatabaseService) {}

    async getAll(): Promise<User[]> {
        return this.database.user.findMany();
    }

    async getById(data: GetUserByIdDto): Promise<User> {
        return this.database.user.findUnique({ where: { id: data.id } });
    }
}
