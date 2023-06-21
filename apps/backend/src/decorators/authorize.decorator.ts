import { SetMetadata } from '@nestjs/common';

import { Role } from '@plugins/prisma-client';

export const Authorization = (...roles: Role[]) => SetMetadata('roles', roles);
