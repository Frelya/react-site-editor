import { makeRequest, queryFactory } from './utils';

type User = {
    id: number;
    name: string;
    email: string;
};

export const useUser = queryFactory('user', async () => {
    return await makeRequest<User>({
        url: '/users',
        method: 'GET'
    });
});
