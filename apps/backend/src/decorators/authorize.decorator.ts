import { SetMetadata } from '@nestjs/common';

import { Role } from '@plugins/prisma-client';

export const Authorize = (...roles: Role[]) => SetMetadata('roles', roles);
