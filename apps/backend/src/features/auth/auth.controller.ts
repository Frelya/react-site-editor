import { Controller, Post, Body, HttpCode, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

import { TOKEN_KEY } from '@shared/constants';
import { SkipAuth } from '@shared/decorators';
import { EnvService } from '@shared/env';

import { AuthService } from './auth.service';
import type { Auth } from './auth.type';
import type { SignInDto, SignUpDto } from './dtos';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly envService: EnvService,
        private readonly authService: AuthService
    ) {}

    @SkipAuth()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body() signInDto: SignInDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<null> {
        const accessToken = await this.authService.signIn(signInDto);

        response.cookie(TOKEN_KEY, accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: this.envService.isProduction ?? false
        });

        return null;
    }

    @SkipAuth()
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async signUp(@Body() signUpDto: SignUpDto): Promise<Auth.RegisteredUser> {
        return await this.authService.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async signOut(@Res({ passthrough: true }) response: Response): Promise<null> {
        await this.authService.signOut();

        response.clearCookie(TOKEN_KEY);

        return null;
    }
}
