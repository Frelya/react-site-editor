import type { Request } from 'express';

import type { Token } from '@features/token';

export function extractTokenFromHeader(request: Request): Token.AccessToken | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}
