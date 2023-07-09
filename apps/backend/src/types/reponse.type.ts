import { Exception } from './exception.type';

export type Response<T = null> = {
    success: boolean;
    timestamp: Date;
} & (
    | {
          success: true;
          data: T;
      }
    | {
          success: false;
          error: Exception;
      }
);
