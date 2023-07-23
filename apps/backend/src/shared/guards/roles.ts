import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '@shared/database';
import { extractRequestFromContext } from '@/utils';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }

        const request = extractRequestFromContext(context);
        const user = request.user;

        if (!user) {
            return false;
        }

        return roles.includes(user.role);
    }
}
