import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

import { colorMethod, colorStatusCode, colorNotImportant } from '@utils/colored-http-logs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger: Logger = new Logger(Logger.name);

    use(request: Request, response: Response, next: NextFunction): void {
        response.on('finish', () => {
            const { method, originalUrl, httpVersion } = request;
            const { statusCode } = response;
            const responseTime = response.get('X-Response-Time');

            this.logger.log(
                `${colorMethod(method)} ` +
                    `${originalUrl} ` +
                    `${colorStatusCode(statusCode)} ` +
                    '- ' +
                    `${colorNotImportant(responseTime)} ` +
                    `${colorNotImportant(`(HTTP/${httpVersion})`)}`
            );
        });

        next();
    }
}
