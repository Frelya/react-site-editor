import { IsString } from 'class-validator';

import { Templates } from '../template.type';

export class GetTemplateByIdDto implements Templates.IdPayload {
    @IsString()
    id: Templates.IdPayload['id'];
}
