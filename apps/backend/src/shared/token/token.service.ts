import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtSignOptions, JwtVerifyOptions, JwtService } from '@nestjs/jwt';

import { handleWithInternalError } from '@/utils';
import { EnvService } from '@shared/env';
import { ERRORS } from '@shared/constants';

import type { Token } from './token.type';

@Injectable()
export class TokenService {
    private readonly options: JwtSignOptions & JwtVerifyOptions & { expiresIn: string };

    constructor(private readonly envService: EnvService, private readonly jwtService: JwtService) {
        this.options = {
            secret: this.envService.get('JWT_SECRET'),
            expiresIn: this.envService.get('JWT_EXPIRES_IN')
        };
    }

    async createAccessToken<T extends object>(payload: T): Promise<Token.AccessToken> {
        if (!payload) {
            throw new UnauthorizedException(ERRORS.TOKEN_PAYLOAD_REQUIRED);
        }

        try {
            return await this.jwtService.signAsync(payload, this.options);
        } catch (error) {
            handleWithInternalError(error);
        }
    }

    async verifyAccessToken<T extends object>(token: Token.AccessToken): Promise<T> {
        if (!token) {
            throw new UnauthorizedException(ERRORS.TOKEN_REQUIRED);
        }

        try {
            return await this.jwtService.verifyAsync<T>(token, this.options);
        } catch (error) {
            handleWithInternalError(error);
        }
    }
}
