import type { WinstonModuleOptions } from 'nest-winston';
import winston from 'winston';

import { isProduction } from '@config/env.config';

type LogInfo = winston.Logform.TransformableInfo;

const formattedInfoLevel = (info: LogInfo): LogInfo => {
    const maxLevelLength = 5;

    return {
        ...info,
        level: info.level.toUpperCase().padEnd(maxLevelLength + 1, ' ')
    };
};

const loggerOptions: WinstonModuleOptions = {
    level: isProduction() ? 'info' : 'debug',

    transports: [new winston.transports.Console()],

    format: winston.format.combine(
        winston.format(formattedInfoLevel)(),

        winston.format.colorize({
            colors: {
                info: 'blue',
                debug: 'magenta'
            }
        }),

        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),

        winston.format.printf((info: LogInfo) => {
            if (info.stack) {
                return `[${info.timestamp}] ${info.level}: ${info.message} - ${info.stack}`;
            }
            return `[${info.timestamp}] ${info.level}: ${info.message}`;
        })
    ),

    exitOnError: false
};

export default loggerOptions;
