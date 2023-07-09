import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
    async transform(value: unknown, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const errors = await validate(plainToInstance(metatype, value));

        if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }

        return value;
    }

    private toValidate(metatype: ArgumentMetadata['metatype']): boolean {
        const types: ArgumentMetadata['metatype'][] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
