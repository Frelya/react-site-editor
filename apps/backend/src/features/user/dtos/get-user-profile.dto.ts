import { IsMongoId } from 'class-validator';

import type { User } from '@shared/database';

import type { Users } from '../user.type';

export class GetUserProfileDto implements Users.UserProfilePayload {
    @IsMongoId()
    readonly id: User['id'];
}
