import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    RequestTimeoutException
} from '@nestjs/common';
import { throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import { REQUEST_TIMEOUT } from '@shared/constants';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            timeout(REQUEST_TIMEOUT),
            catchError((error) => {
                if (error instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException());
                }

                return throwError(() => error);
            })
        );
    }
}
