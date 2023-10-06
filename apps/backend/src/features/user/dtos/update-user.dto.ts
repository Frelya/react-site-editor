import {
    IsStrongPassword,
    IsBoolean,
    IsEmail,
    IsString,
    IsDate,
    IsIn,
    IsOptional,
    ValidateNested
} from 'class-validator';

import { Role, Membership } from '@shared/database';

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
    password: Users.Entity['password'];

    @IsOptional()
    @IsBoolean()
    isVerified: Users.Entity['isVerified'];

    @IsOptional()
    @IsEmail()
    email: Users.Entity['email'];

    @IsOptional()
    @IsString()
    username: Users.Entity['username'];

    @IsOptional()
    @IsIn([Role.User, Role.Admin])
    role: Users.Entity['role'];

    @IsOptional()
    @IsDate()
    lastLogin: Users.Entity['lastLogin'];

    @IsOptional()
    @IsString()
    firstName: Users.Entity['firstName'];

    @IsOptional()
    @IsString()
    lastName: Users.Entity['lastName'];

    @IsOptional()
    @IsIn([Membership.Free, Membership.Premium])
    membership: Users.Entity['membership'];

    @IsOptional()
    @ValidateNested()
    profilePicture: Users.Entity['profilePicture'];
}
