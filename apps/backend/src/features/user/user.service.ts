import {
    Injectable,
    ArgumentMetadata,
    NotFoundException,
    ForbiddenException,
    ConflictException,
    Inject,
    Scope
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { isMongoId } from 'class-validator';

import { DatabaseService } from '@shared/database';
import type { Database } from '@shared/database';
import { CryptService } from '@shared/crypt';
import { TokenService } from '@shared/token';
import { ERRORS } from '@shared/constants';
import { handleWithInternalError } from '@/utils';
import { ValidationPipe } from '@/pipes';

import { Users } from './user.type';
import { CreateUserDto, UpdateUserDto, GetUserByIdDto } from './dtos';
import { removeSensitives, userToProfile } from './helpers';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly cryptService: CryptService,
        private readonly databaseService: DatabaseService,
        private readonly tokenService: TokenService,
        private readonly validationPipe: ValidationPipe
    ) {}

    private static usernameFromEmail(email: Users.CreatePayload['email']): string {
        return email.substring(0, email.indexOf('@'));
    }

    /**
     * @description Validate data using ValidationPipe, when the service is called from another service.
     */
    private async validatePayload<TData, TDto extends ArgumentMetadata['metatype']>(
        data: TData,
        dto?: TDto
    ) {
        await this.validationPipe.transform(data, { type: 'body', metatype: dto });
        return data;
    }

    private clean<TData extends Users.Entity | Users.Entity[]>(
        data: TData,
        sensitivesToInclude?: Users.SensitiveData[]
    ) {
        try {
            return removeSensitives(data, sensitivesToInclude);
        } catch (error) {
            handleWithInternalError(error);
        }
    }

    async create(
        data: Users.CreatePayload,
        sensitivesToInclude?: Users.SensitiveData[]
    ): Promise<Users.CleanedEntity> {
        const { email, password } = await this.validatePayload(data, CreateUserDto);

        const existingUser = await this.databaseService.user.findUnique({ where: { email } });

        if (existingUser && Object.keys(existingUser).length > 0) {
            throw new ConflictException(ERRORS.USER_EXISTS);
        }

        return this.clean(
            await this.databaseService.user.create({
                data: {
                    ...data,
                    username: UserService.usernameFromEmail(email),
                    password: await this.cryptService.hashPassword(password)
                }
            }),
            sensitivesToInclude
        );
    }

    async update(
        data: Users.UpdatePayload,
        sensitivesToInclude?: Users.SensitiveData[]
    ): Promise<Users.CleanedEntity> {
        const { identifier: userIdentifier, ...updateData } = await this.validatePayload(
            data,
            UpdateUserDto
        );

        const identifierKey: keyof Database.UserWhereUniqueInput = isMongoId(userIdentifier)
            ? 'id'
            : 'email';

        const user = await this.databaseService.user.findUnique({
            where: { [identifierKey]: userIdentifier }
        });

        if (!user) {
            throw new NotFoundException(ERRORS.USER_NOT_FOUND);
        }

        if (user[identifierKey] !== userIdentifier) {
            throw new ForbiddenException(ERRORS.USER_NOT_ALLOWED);
        }

        if (Object.keys(updateData).length === 0) {
            return this.clean(user, sensitivesToInclude);
        }

        if (updateData.password) {
            updateData.password = await this.cryptService.hashPassword(updateData.password);
        }

        return this.clean(
            await this.databaseService.user.update({
                data: updateData,
                where: { [identifierKey]: userIdentifier }
            }),
            sensitivesToInclude
        );
    }

    async delete(data: Users.DeletePayload): Promise<null> {
        const { id, password } = data;

        const user = await this.databaseService.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException(ERRORS.USER_NOT_FOUND);
        }

        if (user.id !== id) {
            throw new ForbiddenException(ERRORS.USER_NOT_ALLOWED);
        }

        if (!(await this.cryptService.isPasswordCorrect(password, user.password))) {
            throw new ForbiddenException(ERRORS.WRONG_PASSWORD);
        }

        try {
            await this.databaseService.user.delete({ where: { id } });
        } catch (error) {
            handleWithInternalError(error);
        }

        this.tokenService.invalidateAccessToken(id);

        return null;
    }

    async getAll(sensitivesToInclude?: Users.SensitiveData[]): Promise<Users.CleanedEntity[]> {
        return this.clean(await this.databaseService.user.findMany(), sensitivesToInclude);
    }

    async getById(
        data: Users.IdPayload,
        sensitivesToInclude?: Users.SensitiveData[]
    ): Promise<Users.CleanedEntity> {
        const { id } = await this.validatePayload(data, GetUserByIdDto);

        const user = this.clean(
            await this.databaseService.user.findUnique({ where: { id } }),
            sensitivesToInclude
        );

        if (!user) {
            throw new NotFoundException(ERRORS.USER_NOT_FOUND);
        }

        return user;
    }

    async getProfile(): Promise<Users.Profile> {
        let profile: Users.Profile;

        try {
            profile = userToProfile(
                await this.databaseService.user.findUnique({ where: { id: this.request.user.id } })
            );
        } catch (error) {
            handleWithInternalError(error);
        }

        if (!profile) {
            throw new NotFoundException(ERRORS.USER_NOT_FOUND);
        }

        return profile;
    }
}
