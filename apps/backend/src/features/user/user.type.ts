import type { User } from '@shared/database';

export const userSensitiveData = ['password', 'createdAt'] as const;

export const userPayloadData = ['id', 'email', 'username', 'role'] as const;

export declare namespace Users {
    type Entity = User;

    type SensitiveData = (typeof userSensitiveData)[number];

    type PayloadData = (typeof userPayloadData)[number];

    type NotToUpdate = 'createdAt';

    type Profile = Omit<User, SensitiveData>;

    type CleanedEntity = Pick<Profile, PayloadData> & Partial<Pick<User, SensitiveData>>;

    type CreatePayload = {
        readonly email: User['email'];
        readonly password: User['password'];
    };

    type UpdatePayload = Partial<Omit<User, NotToUpdate>> & {
        readonly identifier: User['id'] | User['email'];
    };

    type IdPayload = {
        readonly id: User['id'];
    };

    type DeletePayload = IdPayload & {
        readonly password: User['password'];
    };
}
