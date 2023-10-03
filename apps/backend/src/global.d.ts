import { z } from 'zod';

import { envVariablesSchema } from '@config/env.config';
import { Users } from '@features/user';

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
    }
}

declare module 'express' {
    interface Request {
        user: {
            id: Users.Entity['id'];
            role: Users.Entity['role'];
        };
    }
}
