import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { environment } from '@config/env.config';
import { APP_HOST, NodeEnvs } from '@shared/constants';

@Injectable()
export class AppHostGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const host = request.get('host');
        const nodeEnv = environment(this.configService).nodeEnv;

        if (nodeEnv === NodeEnvs.PRODUCTION) {
            return host === APP_HOST;
        }

        return true;
    }
}
