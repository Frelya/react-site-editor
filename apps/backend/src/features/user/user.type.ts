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

    interface CreatePayload {
        readonly email: User['email'];
        readonly password: User['password'];
    }

    interface UpdatePayload extends Partial<Omit<User, NotToUpdate>> {
        readonly identifier: User['id'] | User['email'];
    }

    interface IdPayload {
        readonly id: User['id'];
    }

    interface DeletePayload extends IdPayload {
        readonly password: User['password'];
    }
}
