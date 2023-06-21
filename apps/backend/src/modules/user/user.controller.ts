import { Controller, Get, UseGuards } from '@nestjs/common';

import { User, Role } from '@shared/database';
import { RolesGuard } from '@shared/guards';
import { Authorize } from '@decorators/authorize.decorator';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Authorize(Role.Admin)
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAll();
    }
}
