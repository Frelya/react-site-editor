import { Injectable } from '@nestjs/common';

import { DatabaseService, User } from '@shared/database';

@Injectable()
export class UserService {
    constructor(private readonly database: DatabaseService) {}

    async getAll(): Promise<User[]> {
        return this.database.user.findMany();
    }
}
