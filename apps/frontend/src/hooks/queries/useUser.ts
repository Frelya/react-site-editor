import { makeRequest, queryFactory } from './utils';

type User = Record<string, unknown>;

export const useUser = queryFactory('user', async () => {
    return await makeRequest<User>({
        url: '/users/me',
        method: 'GET'
    });
});
