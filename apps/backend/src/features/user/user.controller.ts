import { Controller, Param, Get, UseGuards } from '@nestjs/common';

import { User, Role } from '@shared/database';
import { RolesGuard } from '@shared/guards';
import { Authorize } from '@/decorators';

import { UserService } from './user.service';
import { GetUserByIdDto } from './dtos/get-user-by-id.dto';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Authorize(Role.Admin)
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    async getUserById(@Param() getUserByIdDto: GetUserByIdDto): Promise<User> {
        // await new Promise(res => setTimeout(res, 7000));
        return this.userService.getById(getUserByIdDto);
    }
}
