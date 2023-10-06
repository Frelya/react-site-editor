import { IsString } from 'class-validator';

import { Templates } from '../template.type';

export class GetTemplateByIdDto implements Templates.GetByIdPayload {
    @IsString()
    id: Templates.GetByIdPayload['id'];
}
