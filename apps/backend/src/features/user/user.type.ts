import type { User } from '@shared/database';

export const userSensitiveData = ['password', 'createdAt'] as const;

export const userPayloadData = ['id', 'email', 'username', 'role'] as const;

export declare namespace Users {
    type Entity = User;

    type UserSensitiveData = (typeof userSensitiveData)[number];

    type UserPayloadData = (typeof userPayloadData)[number];

    type NotToUpdate = 'createdAt';

    type UserProfile = Omit<User, UserSensitiveData>;

    type CleanedEntity = Pick<UserProfile, UserPayloadData> & Partial<Pick<User, UserSensitiveData>>;

    interface UserCreatePayload {
        readonly email: User['email'];
        readonly password: User['password'];
    }

    interface UserUpdatePayload extends Partial<Omit<User, NotToUpdate>> {
        readonly identifier: User['id'] | User['email'];
    }

    interface UserIdPayload {
        readonly id: User['id'];
    }

    interface UserDeletePayload extends UserIdPayload {
        readonly password: User['password'];
    }
}
