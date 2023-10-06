import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

import { TokenService, Token } from '@shared/token';
import { ERRORS, TOKEN_KEY } from '@shared/constants';
import { SKIP_AUTH_KEY } from '@shared/decorators';
import { extractRequestFromContext } from '@/utils';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly tokenService: TokenService,
        private readonly reflector: Reflector
    ) {}

    private static extractTokenFromCookies(request: Request): Token.AccessToken | undefined {
        return request.cookies[TOKEN_KEY];
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isSkipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isSkipAuth) {
            return true;
        }

        const request = extractRequestFromContext(context);
        const token = AuthGuard.extractTokenFromCookies(request);

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
