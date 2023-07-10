import { Controller, Param, Get, UseGuards } from '@nestjs/common';

import { User, Role } from '@shared/database';
import { RolesGuard } from '@shared/guards';
import { Authorize } from '@decorators/authorize.decorator';

import { userRoutes } from './user.route';
import { UserService } from './user.service';
import { GetUserByIdDto } from './dtos/get-user-by-id.dto';

@Controller(userRoutes.PREFIX)
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(userRoutes.GET.all)
    @Authorize(Role.Admin)
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(userRoutes.GET.byId)
    async getUserById(@Param() getUserByIdDto: GetUserByIdDto): Promise<User> {
        return this.userService.getById(getUserByIdDto);
    }
}
