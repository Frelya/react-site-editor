import { IsBoolean, IsOptional, IsString, IsInt } from 'class-validator';

import { Templates } from '../template.type';

export class UpdateTemplateDto implements Omit<Templates.UpdatePayload, 'id'> {
    @IsString()
    @IsOptional()
    name?: Templates.UpdatePayload['name'];

    @IsString()
    @IsOptional()
    tree?: Templates.UpdatePayload['tree'];

    @IsBoolean()
    @IsOptional()
    isPublic?: Templates.UpdatePayload['isPublic'];

    @IsInt()
    @IsOptional()
    likes?: Templates.UpdatePayload['likes'];
}
