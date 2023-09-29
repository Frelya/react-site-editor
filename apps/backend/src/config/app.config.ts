import type { NestApplicationOptions } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import loggerOptions from '@config/logger.config';

const customLogger = WinstonModule.createLogger(loggerOptions);

const appOptions: NestApplicationOptions = {
    bodyParser: true,
    bufferLogs: true,
    logger: customLogger
};

export default appOptions;
