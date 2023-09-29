import { IsMongoId } from 'class-validator';

import type { Users } from '../user.type';

export class GetUserByIdDto implements Users.UserIdPayload {
    @IsMongoId()
    readonly id: Users.Entity['id'];
}
