import type { WinstonModuleOptions } from 'nest-winston';
import winston from 'winston';
import * as process from 'process';

type LogInfo = { [key: string]: string };

const formattedInfoLevel = (info: LogInfo) => {
    const maxLevelLength = 5;

    return {
        ...info,
        level: info.level.toUpperCase().padEnd(maxLevelLength + 1, ' ')
    };
};

const loggerOptions: WinstonModuleOptions = {
    // The env config module is not loaded yet,
    // so we need to use the process.env.NODE_ENV variable
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',

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

        winston.format.printf(({ level, message, timestamp }: LogInfo) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),

    exitOnError: false
};

export default loggerOptions;
