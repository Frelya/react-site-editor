import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { Role } from '@plugins/prisma-client';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user;

        return roles.includes(user.role);
    }
}
