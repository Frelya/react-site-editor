import { IsMongoId } from 'class-validator';

import { Users } from '../user.type';

export class GetUserByIdDto implements Users.IdPayload {
    @IsMongoId()
    readonly id: Users.Entity['id'];
}
