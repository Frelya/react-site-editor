import type { WinstonModuleOptions } from 'nest-winston';
import winston from 'winston';

type LogInfo = { [key: string]: string };

const formattedInfo = (info: LogInfo) => {
    return { ...info, level: info.level.toUpperCase() };
};

const loggerOptions: WinstonModuleOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format(formattedInfo)(),
        winston.format.colorize({ colors: { info: 'blue' } }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp }: LogInfo) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    exitOnError: false
};

export default loggerOptions;
