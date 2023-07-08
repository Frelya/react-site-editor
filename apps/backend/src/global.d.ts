import { z } from 'zod';

import { envVariablesSchema } from '@config/env.config';
import { User } from '@shared/database';


declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariablesSchema> {
        }
    }
}

declare module 'express' {
    interface Request {
        user: User;
    }
}
