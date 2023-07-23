import { IsMongoId, IsString, IsDefined } from 'class-validator';

import type { User } from '@shared/database';

import type { Users } from '../user.type';

export class DeleteUserDto implements Users.UserDeletePayload {
    @IsMongoId()
    id: User['id'];

    @IsString()
    @IsDefined()
    readonly password: User['password'];
}
