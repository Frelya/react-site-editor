import {
    IsNotEmpty,
    IsStrongPassword,
    IsEmail,
    IsString,
    IsDate,
    IsIn,
    ValidateNested,
    IsDefined
} from 'class-validator';

import { Role, Membership } from '@shared/database';
import type { User } from '@shared/database';

import type { Users } from '../user.type';

class UserInfos implements Users.UserUpdateInfos {
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: User['password'];

    @IsEmail()
    email: User['email'];

    @IsNotEmpty()
    @IsString()
    username: User['username'];

    @IsIn([Role.User, Role.Admin])
    role: User['role'];

    @IsDate()
    lastLogin: User['lastLogin'];

    @IsString()
    firstName: User['firstName'];

    @IsNotEmpty()
    @IsString()
    lastName: User['lastName'];

    @IsIn([Membership.Free, Membership.Premium])
    membership: User['membership'];

    @ValidateNested()
    profilePicture: User['profilePicture'];
}

export class UpdateUserDto implements Users.UserUpdatePayload {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    identifier: User['id'] | User['email'];

    @ValidateNested()
    infos: UserInfos;
}
