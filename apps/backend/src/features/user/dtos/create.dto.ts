import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

import { Users } from '../user.type';

export class CreateUserDto implements Users.CreatePayload {
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
