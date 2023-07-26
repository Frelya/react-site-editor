import { SetMetadata } from '@nestjs/common';

export const SKIP_AUTH_KEY = 'skip-auth';

export const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true);
