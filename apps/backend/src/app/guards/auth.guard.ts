import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TokenService } from '@features/token';
import { ERRORS } from '@shared/constants';
import { SKIP_AUTH_KEY } from '@shared/decorators';
import { extractRequestFromContext, extractTokenFromCookies } from '@/utils';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly tokenService: TokenService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isSkipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isSkipAuth) {
            return true;
        }

        const request = extractRequestFromContext(context);
        const token = extractTokenFromCookies(request);

        if (!token) {
            throw new UnauthorizedException(ERRORS.TOKEN_REQUIRED);
        }

        try {
            request.user = await this.tokenService.verifyAccessToken(token);
        } catch {
            throw new ForbiddenException(ERRORS.TOKEN_INVALID);
        }

        return true;
    }
}
