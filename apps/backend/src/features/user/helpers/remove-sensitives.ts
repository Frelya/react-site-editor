import type { User } from '@shared/database';

import { userPayloadData } from '../user.type';
import type { Users } from '../user.type';

export type Sanitized<T> = T extends User ? Users.UniqueUser : Users.UniqueUser[];

type UniqueUserKey = Users.UserPayloadData | Users.UserSensitiveData;

const isSingle = (data: User | User[]): data is User => !Array.isArray(data);

const pickFromSingle = (data: User, include: UniqueUserKey[]): Users.UniqueUser => {
    const user = { ...data };
    Object.keys(user).forEach((key) => {
        if (!include.includes(key as UniqueUserKey)) {
            delete user[key as keyof User];
        }
    });
    return user as Users.UniqueUser;
};

export function removeSensitives<TData extends User | User[]>(
    data: TData,
    sensitivesToInclude?: Users.UserSensitiveData[]
): Sanitized<TData> {
    if (!data) {
        return data as Sanitized<TData>;
    }

    const picked = [...userPayloadData, ...(sensitivesToInclude || [])] as UniqueUserKey[];

    if (isSingle(data)) {
        return pickFromSingle(data, picked) as Sanitized<TData>;
    }

    return data.map((user) => pickFromSingle(user, picked)) as Sanitized<TData>;
}
