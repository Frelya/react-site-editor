import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidatorOptions } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ERRORS } from '@shared/constants';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
    private readonly validatorOptions: ValidatorOptions = {
        stopAtFirstError: true
    };

    async transform(value: unknown, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        // TODO: Fix the "an unknown value was passed to the validate function" error
        //  triggered when passing `this.validatorOptions` as the second argument.
        const errors = await validate(plainToInstance(metatype, value));

        if (errors.length > 0) {
            throw new BadRequestException(
                `${ERRORS.VALIDATION_ERROR}: ${Object.values(errors[0].constraints)}`
            );
        }

        return value;
    }

    private toValidate(metatype: ArgumentMetadata['metatype']): boolean {
        const types: ArgumentMetadata['metatype'][] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
