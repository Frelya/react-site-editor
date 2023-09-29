import { queryFactory, makeRequest } from './utils';
import type { FetcherArgs } from './utils';

type LoginBody = {
    email: string;
    password: string;
};

export const useLogin = queryFactory('login', async ([body]: FetcherArgs<LoginBody>) => {
    return await makeRequest<null, LoginBody>({
        url: '/auth/login',
        method: 'POST',
        body: body
    });
});
