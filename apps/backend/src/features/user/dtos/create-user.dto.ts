import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

import type { Users } from '../user.type';

export class CreateUserDto implements Users.UserCreatePayload {
    @IsEmail()
    readonly email: Users.Entity['email'];

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    @IsString()
    readonly password: Users.Entity['password'];
}
