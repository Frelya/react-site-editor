import { Logger, InternalServerErrorException } from '@nestjs/common';

import { ERRORS } from '@shared/constants';

const logger = new Logger('Shared:HandleInternalError');

export function handleWithInternalError(error: unknown): InternalServerErrorException {
    logger.error(error);
    throw new InternalServerErrorException(ERRORS.INTERNAL_SERVER_ERROR);
}
