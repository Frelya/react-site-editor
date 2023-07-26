import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { APP_HOST } from '@shared/constants';
import { EnvService } from '@shared/env';
import { extractRequestFromContext } from '@/utils';

@Injectable()
export class HostGuard implements CanActivate {
    constructor(private readonly envService: EnvService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = extractRequestFromContext(context);
        const host = request.get('host');

        if (this.envService.isProduction) {
            return host === APP_HOST;
        }

        return true;
    }
}
