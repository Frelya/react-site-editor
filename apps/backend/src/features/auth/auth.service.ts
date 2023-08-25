import {
    Injectable,
    Scope,
    Inject,
    ForbiddenException,
    UnauthorizedException
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { ERRORS } from '@shared/constants';
import { CryptService } from '@shared/crypt';
import { TokenService } from '@features/token';
import { UserService } from '@features/user';

import type { Auth } from './auth.type';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly cryptService: CryptService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService
    ) {}

    async signIn(data: Auth.UserCredentials): Promise<Auth.AccessToken> {
        let user: Auth.RegisteredUser;

        user = await this.userService.update(
            {
                identifier: data.email
            },
            ['password']
        );

        if (!(await this.cryptService.isPasswordCorrect(data.password, user.password))) {
            throw new ForbiddenException(ERRORS.WRONG_PASSWORD);
        }

        user = await this.userService.update({
            lastLogin: new Date(),
            identifier: user.id
        });

        // TODO: Implement refresh token system
        // TODO: Implement blacklist/whitelist system
        //  (store token, add to whitelist, etc.)
        return {
            token: await this.tokenService.createAccessToken(user)
        };
    }

    async signUp(data: Auth.SignUpPayload): Promise<Auth.RegisteredUser> {
        const { email, password, confirmPassword } = data;

        if (password != confirmPassword) {
            throw new UnauthorizedException(ERRORS.WRONG_CONFIRM_PASSWORD);
        }

        return await this.userService.create({ email, password });
    }

    async signOut(): Promise<null> {
        const existingUser = await this.userService.getById({ id: this.request.user.id });

        if (!existingUser) {
            throw new ForbiddenException(ERRORS.USER_NOT_FOUND);
        }

        // TODO: Implement blacklist/whitelist system
        //  (invalidate token, add to blacklist, etc.)

        return null;
    }
}
