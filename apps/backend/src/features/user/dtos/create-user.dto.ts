import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

import type { User } from '@shared/database';

import type { Users } from '../user.type';

export class CreateUserDto implements Users.UserCreatePayload {
    @IsEmail()
    readonly email: User['email'];

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    @IsString()
    readonly password: User['password'];
}
