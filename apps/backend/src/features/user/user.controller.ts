import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';

import { Role } from '@shared/database';
import { RolesGuard } from '@shared/guards';
import { Authorize } from '@shared/decorators';

import { UserService } from './user.service';
import type { Users } from './user.type';
import type {
    UpdateUserDto,
    DeleteUserDto,
    GetUserByIdDto,
} from './dtos';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Authorize(Role.Admin)
    @Get()
    async getAllUsers(): Promise<Users.UsersList> {
        return await this.userService.getAll();
    }

    @Get('me')
    async getUserProfile(): Promise<Users.UserProfile> {
        return await this.userService.getProfile();
    }

    @HttpCode(HttpStatus.OK)
    @Post(':id/update')
    async updateUser(
        @Body() updateUserDto: UpdateUserDto,
        @Param('id') userId: GetUserByIdDto['id']
    ): Promise<Users.UniqueUser> {
        return await this.userService.update({
            ...updateUserDto,
            identifier: userId
        });
    }

    @HttpCode(HttpStatus.OK)
    @Post(':id/delete')
    async deleteUser(
        @Body() deleteUserDto: DeleteUserDto,
        @Param('id') userId: GetUserByIdDto['id']
    ): Promise<null> {
        return await this.userService.delete({
            ...deleteUserDto,
            id: userId
        });
    }
}
