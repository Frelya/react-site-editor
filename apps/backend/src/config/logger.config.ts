import type { Params } from 'nestjs-pino';

const loggerModuleOptions: Params = {
    pinoHttp: {
        transport: {
            target: 'pino-pretty',
            options: {
                hideObject: true,
                customColors: 'error=re;success=green;info=white;debug=yellow;trace=cyan;warn=magenta',
                ignore: 'pid,hostname,context'
            }
        }
    }
};

export default loggerModuleOptions;
