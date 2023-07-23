import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { SkipAuth } from '@shared/decorators';

import { AuthService } from './auth.service';
import type { Auth } from './auth.type';
import type { SignInDto, SignUpDto } from './dtos';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @SkipAuth()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto): Promise<Auth.AccessToken> {
        return await this.authService.signIn(signInDto);
    }

    @SkipAuth()
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async signUp(@Body() signUpDto: SignUpDto): Promise<Auth.RegisteredUser> {
        return await this.authService.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async signOut(): Promise<null> {
        return await this.authService.signOut();
    }
}
