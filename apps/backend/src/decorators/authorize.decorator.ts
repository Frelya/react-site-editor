import { SetMetadata } from '@nestjs/common';
import { Role } from '@shared/database';

export const Authorize = (...roles: Role[]) => SetMetadata('roles', roles);
