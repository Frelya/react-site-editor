import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Delete,
    HttpCode,
    HttpStatus,
    UseGuards
} from '@nestjs/common';

import { Role } from '@shared/database';
import { RolesGuard } from '@shared/guards';
import { Authorize } from '@shared/decorators';

import { UserService } from './user.service';
import { Users } from './user.type';
import type { UpdateUserDto, DeleteUserDto, GetUserByIdDto } from './dtos';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Authorize(Role.Admin)
    @HttpCode(HttpStatus.OK)
    @Get()
    async getAllUsers(): Promise<Users.CleanedEntity[]> {
        return await this.userService.getAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get('me')
    async getUserProfile(): Promise<Users.Profile> {
        return await this.userService.getProfile();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getUserById(@Param() routeParams: GetUserByIdDto): Promise<Users.CleanedEntity> {
        return await this.userService.getById({
            id: routeParams.id
        });
    }

    @HttpCode(HttpStatus.OK)
    @Post(':id')
    async updateUser(
        @Body() updateDto: UpdateUserDto,
        @Param() routeParams: GetUserByIdDto
    ): Promise<Users.CleanedEntity> {
        return await this.userService.update({
            ...updateDto,
            identifier: routeParams.id
        });
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async deleteUser(
        @Body() deleteDto: DeleteUserDto,
        @Param() routeParams: GetUserByIdDto
    ): Promise<null> {
        return await this.userService.delete({
            ...deleteDto,
            id: routeParams.id
        });
    }
}
