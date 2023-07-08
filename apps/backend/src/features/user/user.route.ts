import type { Routes } from '@/types';

const userRoutes: Routes = {
    PREFIX: 'users',
    GET: {
        all: '',
        byId: ':id',
    },
    POST: {}
};

export { userRoutes }
