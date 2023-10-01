import type { Request } from 'express';

import { TOKEN_KEY } from '@shared/constants';
import { Token } from '@shared/token';

export function extractTokenFromCookies(request: Request): Token.AccessToken | undefined {
    return request.cookies[TOKEN_KEY];
}
