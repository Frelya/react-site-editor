import { IsNotEmpty, IsString } from 'class-validator';

import { User } from '@shared/database';

export class GetUserByIdDto {
    @IsNotEmpty()
    @IsString()
    readonly id: User['id'];
}
