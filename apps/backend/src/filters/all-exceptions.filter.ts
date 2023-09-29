import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { ERRORS } from '@shared/constants';
import { isDevelopment } from '@config/env.config';
import type { ApiResponse } from '@react-site-editor/types';

function toSerializableError(value: unknown): unknown {
    if (value instanceof Error) {
        return {
            name: value.name,
            message: value.message,
            stack: isDevelopment() ? value.stack : undefined
        };
    }

    return value;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        let [statusCode, message]: [number, string] = [
            HttpStatus.INTERNAL_SERVER_ERROR,
            ERRORS.INTERNAL_SERVER_ERROR
        ];

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus() || statusCode;
            message = exception.message || message;
        }

        const ctx = host.switchToHttp();

        const responseBody: ApiResponse = {
            success: false,
            error: {
                code: statusCode,
                message: message,
                path: ctx.getRequest().url,
                details: toSerializableError(exception)
            },
            timestamp: new Date()
        };

        const { httpAdapter } = this.httpAdapterHost;

        httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    }
}
