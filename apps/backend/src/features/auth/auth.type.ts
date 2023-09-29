import type { User } from '@shared/database';
import type { Users } from '@features/user';
import type { Token } from '@features/token';

export declare namespace Auth {
    type UserCredentials = {
        readonly email: User['email'];
        readonly password: User['password'];
    };

    type SignUpPayload = UserCredentials & {
        readonly confirmPassword: User['password'];
    };

    type AccessToken = Token.AccessToken;

    type RegisteredUser = Users.UniqueUser;
}
