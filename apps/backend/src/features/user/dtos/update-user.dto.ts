import {
    IsStrongPassword,
    IsBoolean,
    IsEmail,
    IsString,
    IsDate,
    IsIn,
    IsOptional,
    ValidateNested,
} from 'class-validator';

import { Role, Membership } from '@shared/database';
import type { User } from '@shared/database';

import type { Users } from '../user.type';

export class UpdateUserDto implements Omit<Users.UserUpdatePayload, 'identifier'> {
    @IsOptional()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: User['password'];

    @IsOptional()
    @IsBoolean()
    isVerified: User['isVerified'];

    @IsOptional()
    @IsEmail()
    email: User['email'];

    @IsOptional()
    @IsString()
    username: User['username'];

    @IsOptional()
    @IsIn([Role.User, Role.Admin])
    role: User['role'];

    @IsOptional()
    @IsDate()
    lastLogin: User['lastLogin'];

    @IsOptional()
    @IsString()
    firstName: User['firstName'];

    @IsOptional()
    @IsString()
    lastName: User['lastName'];

    @IsOptional()
    @IsIn([Membership.Free, Membership.Premium])
    membership: User['membership'];

    @IsOptional()
    @ValidateNested()
    profilePicture: User['profilePicture'];
}
