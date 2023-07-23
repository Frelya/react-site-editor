import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export function extractRequestFromContext(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest<Request>();
}
