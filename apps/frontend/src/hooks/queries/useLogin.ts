import { queryFactory, makeRequest } from './utils';
import type { FetcherArgs } from './utils';

type LoginBody = {
    email: string;
    password: string;
};

type LoginResponse = {
    token: string;
};

export const useLogin = queryFactory('login', async ([body]: FetcherArgs<LoginBody>) => {
    return await makeRequest<LoginResponse, LoginBody>({
        url: '/auth/login',
        method: 'POST',
        body: body
    });
});
