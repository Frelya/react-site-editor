import { z } from 'zod';

import { envVariablesSchema } from '@config/env.config';
import type { Users } from '@features/user';

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
    }
}

declare module 'express' {
    interface Request {
        user: Users.UniqueUser;
    }
}
