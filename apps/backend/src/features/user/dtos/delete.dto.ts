import { IsString, IsDefined } from 'class-validator';

import { Users } from '../user.type';

export class DeleteUserDto implements Omit<Users.DeletePayload, 'id'> {
    @IsString()
    @IsDefined()
    readonly password: Users.Entity['password'];
}
