import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards
} from '@nestjs/common';

import { Role } from '@shared/database';
import { RolesGuard } from '@shared/guards';
import { Authorize } from '@shared/decorators';

import { UserService } from './user.service';
import type { Users } from './user.type';
import type {
    CreateUserDto,
    UpdateUserDto,
    DeleteUserDto,
    GetUserByIdDto,
    GetUserProfileDto
} from './dtos';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<Users.UniqueUser> {
        return await this.userService.create(createUserDto);
    }

    @Authorize(Role.Admin)
    @Get()
    async getAllUsers(): Promise<Users.UsersList> {
        return await this.userService.getAll();
    }

    @Get(':id')
    async getUserById(@Param() getUserByIdDto: GetUserByIdDto): Promise<Users.UniqueUser> {
        return await this.userService.getById(getUserByIdDto);
    }

    @Get(':id/profile')
    async getUserProfile(
        @Param() getUserProfileDto: GetUserProfileDto
    ): Promise<Users.UserProfile> {
        return await this.userService.getProfile(getUserProfileDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post(':id/update')
    async updateUser(
        @Body() updateUserDto: UpdateUserDto,
        @Param('id') userId: GetUserByIdDto['id']
    ): Promise<Users.UniqueUser> {
        updateUserDto.identifier = userId;
        return await this.userService.update(updateUserDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post(':id/delete')
    async deleteUser(
        @Body() deleteUserDto: DeleteUserDto,
        @Param('id') userId: GetUserByIdDto['id']
    ): Promise<null> {
        deleteUserDto.id = userId;
        return await this.userService.delete(deleteUserDto);
    }
}
