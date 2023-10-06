import { Users } from '@features/user';
import { Tokens } from '@shared/token';

export declare namespace Auth {
    type UserCredentials = {
        readonly email: Users.Entity['email'];
        readonly password: Users.Entity['password'];
    };

    type SignUpPayload = UserCredentials & {
        readonly confirmPassword: Users.Entity['password'];
    };

    type AccessToken = Tokens.AccessToken;

    type RegisteredUser = Users.CleanedEntity;
}
