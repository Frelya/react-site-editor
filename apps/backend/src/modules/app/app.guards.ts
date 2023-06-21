import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AppHostGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        return request.headers.host === 'localhost:3000';
    }
}
