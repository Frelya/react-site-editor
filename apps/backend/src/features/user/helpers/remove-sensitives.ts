import { userPayloadData } from '../user.type';
import type { Users } from '../user.type';

export type Sanitized<T> = T extends Users.Entity ? Users.CleanedEntity : Users.CleanedEntity[];

type UniqueUserKey = Users.UserPayloadData | Users.UserSensitiveData;

const isSingle = (data: Users.Entity | Users.Entity[]): data is Users.Entity => !Array.isArray(data);

const pickFromSingle = (data: Users.Entity, include: UniqueUserKey[]): Users.CleanedEntity => {
    const user = { ...data };
    Object.keys(user).forEach((key) => {
        if (!include.includes(key as UniqueUserKey)) {
            delete user[key as keyof Users.Entity];
        }
    });
    return user as Users.CleanedEntity;
};

export function removeSensitives<TData extends Users.Entity | Users.Entity[]>(
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
