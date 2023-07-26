import type { User } from '@shared/database';

import { userSensitiveData } from '../user.type';
import type { Users } from '../user.type';

export function userToProfile(user: User): Users.UserProfile {
    const profile = { ...user };
    userSensitiveData.forEach((key) => delete profile[key]);
    return profile as Users.UserProfile;
}
