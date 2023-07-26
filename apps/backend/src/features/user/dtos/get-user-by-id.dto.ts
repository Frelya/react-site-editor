import { IsMongoId } from 'class-validator';

import type { User } from '@shared/database';

import type { Users } from '../user.type';

export class GetUserByIdDto implements Users.UserIdPayload {
    @IsMongoId()
    readonly id: User['id'];
}
