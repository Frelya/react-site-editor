import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import type { Response } from '@/types';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody: Response = {
            success: false,
            error: {
                code: httpStatus,
                message:
                    exception instanceof HttpException
                        ? exception.message
                        : 'Internal Server Error',
                details: exception instanceof HttpException ? exception.getResponse() : exception
            },
            timestamp: new Date()
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
