import { ResponseError } from './response-error.type';

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
          error: ResponseError;
      }
);
