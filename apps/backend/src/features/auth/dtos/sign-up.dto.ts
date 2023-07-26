import { IsString, IsEmail, IsStrongPassword } from 'class-validator';

import type { User } from '@shared/database';

export class SignUpDto {
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

    @IsString()
    readonly confirmPassword: User['password'];
}
