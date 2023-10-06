import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { handleWithInternalError } from '@/utils';
import { EnvService } from '@shared/env';
import { ERRORS } from '@shared/constants';
import { Users } from '@features/user';

import { Tokens } from './token.type';

@Injectable()
export class TokenService {
    // TODO: Use Redis here instead of a map object
    private static readonly whiteList: Tokens.WhiteList = new Map();

    private readonly options: Tokens.SignOptions;

    constructor(private readonly envService: EnvService, private readonly jwtService: JwtService) {
        this.options = {
            secret: this.envService.get('JWT_SECRET'),
            expiresIn: this.envService.get('JWT_EXPIRES_IN')
        };
    }

    invalidateAccessToken(userId: Users.Entity['id']): void {
        TokenService.whiteList.delete(userId);
    }

    private static isJsonWebTokenError(error: unknown): boolean {
        return (error as Error).name === 'JsonWebTokenError';
    }

    private static isTokenExpiredError(error: unknown): boolean {
        return (error as Error).name === 'TokenExpiredError';
    }

    async createAccessToken(payload: Users.CleanedEntity): Promise<Tokens.AccessToken> {
        if (!payload) {
            throw new UnauthorizedException(ERRORS.TOKEN_PAYLOAD_REQUIRED);
        }

        try {
            const token = await this.jwtService.signAsync(payload, this.options);

            TokenService.whiteList.set(payload.id, token);

            return token;
        } catch (error) {
            if (TokenService.isJsonWebTokenError(error)) {
                throw new UnauthorizedException(ERRORS.TOKEN_INVALID);
            }

            handleWithInternalError(error);
        }
    }

    async verifyAccessToken(token: Tokens.AccessToken): Promise<Users.CleanedEntity> {
        let user: Users.CleanedEntity;

        try {
            user = await this.jwtService.verifyAsync<Users.CleanedEntity>(token, this.options);
        } catch (error) {
            if (TokenService.isTokenExpiredError(error)) {
                throw new UnauthorizedException(ERRORS.TOKEN_EXPIRED);
            }

            if (TokenService.isJsonWebTokenError(error)) {
                throw new UnauthorizedException(ERRORS.TOKEN_INVALID);
            }

            handleWithInternalError(error);
        }

        if (TokenService.whiteList.get(user.id) !== token) {
            throw new UnauthorizedException(ERRORS.TOKEN_INVALID);
        }

        return user;
    }
}
