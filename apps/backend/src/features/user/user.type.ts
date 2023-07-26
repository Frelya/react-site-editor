import type { User } from '@shared/database';

export const userSensitiveData = ['password', 'createdAt'] as const;

export const userPayloadData = ['id', 'email', 'username', 'role'] as const;

export declare namespace Users {
    type UserSensitiveData = (typeof userSensitiveData)[number];

    type UserPayloadData = (typeof userPayloadData)[number];

    type NotToUpdate = 'createdAt';

    type UserProfile = Omit<User, UserSensitiveData>;

    type UniqueUser = Pick<UserProfile, UserPayloadData> & Partial<Pick<User, UserSensitiveData>>;

    type UsersList = UniqueUser[];

    type UserUpdateInfos = Partial<Omit<User, NotToUpdate>>;

    interface UserCreatePayload {
        readonly email: User['email'];
        readonly password: User['password'];
    }

    interface UserUpdatePayload {
        identifier: User['id'] | User['email'];
        infos: UserUpdateInfos;
    }

    interface UserDeletePayload {
        readonly id: User['id'];
        readonly password: User['password'];
    }

    interface UserIdPayload {
        readonly id: User['id'];
    }

    interface UserProfilePayload extends UserIdPayload {}
}
