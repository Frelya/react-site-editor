import type { Users } from '@features/user';
import { Token } from '@shared/token';

export declare namespace Auth {
    type UserCredentials = {
        readonly email: Users.Entity['email'];
        readonly password: Users.Entity['password'];
    };

    type SignUpPayload = UserCredentials & {
        readonly confirmPassword: Users.Entity['password'];
    };

    type AccessToken = Token.AccessToken;

    type RegisteredUser = Users.CleanedEntity;
}
