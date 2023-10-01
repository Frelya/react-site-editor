import { IsString } from 'class-validator';

import { Templates } from '../template.type';

export class GetTemplateByIdDto {
    @IsString()
    id: Templates.GetByIdPayload['id'];
}
