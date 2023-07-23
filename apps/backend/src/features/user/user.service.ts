import {
    Injectable,
    ArgumentMetadata,
    NotFoundException,
    ForbiddenException,
    ConflictException
} from '@nestjs/common';
import { isMongoId } from 'class-validator';

import { DatabaseService } from '@shared/database';
import type { User, Database } from '@shared/database';
import { CryptService } from '@shared/crypt';
import { ERRORS } from '@shared/constants';
import { handleWithInternalError } from '@/utils';
import { ValidationPipe } from '@/pipes';

import type { Users } from './user.type';
import { CreateUserDto, UpdateUserDto, GetUserByIdDto } from './dtos';
import { removeSensitives, userToProfile } from './helpers';

@Injectable()
export class UserService {
    constructor(
        private readonly cryptService: CryptService,
        private readonly databaseService: DatabaseService,
        private readonly validationPipe: ValidationPipe
    ) {}

    private static usernameFromEmail(email: Users.UserCreatePayload['email']): string {
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

    private clean<TData extends User | User[]>(
        data: TData,
        sensitivesToInclude?: Users.UserSensitiveData[]
    ) {
        try {
            return removeSensitives(data, sensitivesToInclude);
        } catch (error) {
            handleWithInternalError(error);
        }
    }

    async create(
        data: Users.UserCreatePayload,
        sensitivesToInclude?: Users.UserSensitiveData[]
    ): Promise<Users.UniqueUser> {
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
                    password: await this.cryptService.hashPassword(password),
                    createdAt: new Date()
                }
            }),
            sensitivesToInclude
        );
    }

    async update(
        data: Users.UserUpdatePayload,
        sensitivesToInclude?: Users.UserSensitiveData[]
    ): Promise<Users.UniqueUser> {
        const updateData = await this.validatePayload(data, UpdateUserDto);

        const identifierKey: keyof Database.UserWhereUniqueInput = isMongoId(updateData.identifier)
            ? 'id'
            : 'email';

        const user = await this.databaseService.user.findUnique({
            where: { [identifierKey]: updateData.identifier }
        });

        if (!user) {
            throw new NotFoundException(ERRORS.USER_NOT_FOUND);
        }

        if (user[identifierKey] !== updateData.identifier) {
            throw new ForbiddenException(ERRORS.USER_NOT_ALLOWED);
        }

        if (Object.keys(updateData.infos).length === 0) {
            return this.clean(user, sensitivesToInclude);
        }

        if (updateData.infos.password) {
            updateData.infos.password = await this.cryptService.hashPassword(
                updateData.infos.password
            );
        }

        return this.clean(
            await this.databaseService.user.update({
                data: updateData.infos,
                where: { [identifierKey]: updateData.identifier }
            }),
            sensitivesToInclude
        );
    }

    async delete(data: Users.UserDeletePayload): Promise<null> {
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
            return null;
        } catch (error) {
            handleWithInternalError(error);
        }
    }

    async getAll(sensitivesToInclude?: Users.UserSensitiveData[]): Promise<Users.UsersList> {
        return this.clean(await this.databaseService.user.findMany(), sensitivesToInclude);
    }

    async getById(
        data: Users.UserIdPayload,
        sensitivesToInclude?: Users.UserSensitiveData[]
    ): Promise<Users.UniqueUser> {
        const { id } = await this.validatePayload(data, GetUserByIdDto);
        return this.clean(
            await this.databaseService.user.findUnique({ where: { id } }),
            sensitivesToInclude
        );
    }

    async getProfile(data: Users.UserProfilePayload): Promise<Users.UserProfile> {
        let profile: Users.UserProfile;

        try {
            profile = userToProfile(
                await this.databaseService.user.findUnique({ where: { id: data.id } })
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
