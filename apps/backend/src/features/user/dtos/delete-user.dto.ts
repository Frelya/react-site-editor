import { IsString, IsDefined } from 'class-validator';

import type { Users } from '../user.type';

export class DeleteUserDto implements Omit<Users.UserDeletePayload, 'id'> {
    @IsString()
    @IsDefined()
    readonly password: Users.Entity['password'];
}
