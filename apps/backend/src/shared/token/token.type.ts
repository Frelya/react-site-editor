import type { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

import { Users } from '@features/user';

export declare namespace Tokens {
    type AccessToken = string;

    type WhiteList = Map<Users.Entity['id'], AccessToken>;

    type SignOptions = JwtSignOptions & JwtVerifyOptions & { expiresIn: string };
}
