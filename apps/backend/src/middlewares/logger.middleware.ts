import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { colorMethod, colorStatusCode, colorNotImportant } from '@utils/colored-http-logs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger: Logger = new Logger(LoggerMiddleware.name);

    // Got errors when using the Request, Response and NextFunction types
    // TODO: Fix the types if possible
    use(request: any, response: any, next: any): void {
        response.on('finish', () => {
            const { method, originalUrl, httpVersion } = request;
            const { statusCode } = response;
            const responseTime = response.get('X-Response-Time');

            this.logger.debug(
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
