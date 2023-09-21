import type { Request } from 'express';

import { TOKEN_KEY } from '@shared/constants';
import type { Token } from '@features/token';

export function extractTokenFromCookies(request: Request): Token.AccessToken | undefined {
    return request.cookies[TOKEN_KEY];
}
