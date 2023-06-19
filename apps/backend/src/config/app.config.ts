import type { NestApplicationOptions } from '@nestjs/common';

const appOptions: NestApplicationOptions = {
    cors: true,
    bodyParser: true,
    bufferLogs: true
};

export default appOptions;
