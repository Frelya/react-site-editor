import { IsNotEmpty, IsString } from 'class-validator';
import { z } from 'zod';

export class GetUserByIdDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}

export const GetUserByIdDtoSchema = z.object({
    id: z.string(),
});
