import { IsEmail, IsString, IsDefined } from 'class-validator';

import type { User } from '@shared/database';

export class SignInDto {
    @IsEmail()
    readonly email: User['email'];

    @IsString()
    @IsDefined()
    readonly password: User['password'];
}
