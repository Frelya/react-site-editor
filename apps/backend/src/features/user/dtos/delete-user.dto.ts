import { IsString, IsDefined } from 'class-validator';

import type { User } from '@shared/database';

import type { Users } from '../user.type';

export class DeleteUserDto implements Omit<Users.UserDeletePayload, 'id'> {
    @IsString()
    @IsDefined()
    readonly password: User['password'];
}
