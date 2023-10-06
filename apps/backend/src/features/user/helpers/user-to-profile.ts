import { userSensitiveData } from '../user.type';
import { Users } from '../user.type';

export function userToProfile(user: Users.Entity): Users.Profile {
    const profile = { ...user };
    userSensitiveData.forEach((key) => delete profile[key]);
    return profile as Users.Profile;
}
