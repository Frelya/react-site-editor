import { SetMetadata } from '@nestjs/common';
import { Role } from '@shared/database';

export const ROLES_KEY = 'roles';
export const Authorize = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
