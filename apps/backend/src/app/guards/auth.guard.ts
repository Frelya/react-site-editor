import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

import { TokenService, Tokens } from '@shared/token';
import { ERRORS, TOKEN_KEY } from '@shared/constants';
import { SKIP_AUTH_KEY } from '@shared/decorators';
import { extractRequestFromContext } from '@/utils';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly tokenService: TokenService,
        private readonly reflector: Reflector
    ) {}

    private static extractTokenFromCookies(request: Request): Tokens.AccessToken | undefined {
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

        request.user = await this.tokenService.verifyAccessToken(token);

        return true;
    }
}
