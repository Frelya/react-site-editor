import { IsString, IsBooleanString } from 'class-validator';

import { Templates } from '../template.type';

export class CreateTemplateDto implements Templates.CreatePayload {
    @IsString()
    name: Templates.CreatePayload['name'];

    @IsString()
    tree: Templates.CreatePayload['tree'];

    @IsBooleanString()
    isPublic: Templates.CreatePayload['isPublic'];
}
