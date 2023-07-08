import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { APP_HOST } from '@shared/constants';
import { EnvService } from '@shared/env';

@Injectable()
export class AppHostGuard implements CanActivate {
    constructor(private readonly envService: EnvService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const host = request.get('host');

        if (this.envService.isProduction) {
            return host === APP_HOST;
        }

        return true;
    }
}
