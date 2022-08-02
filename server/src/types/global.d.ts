import type { RequestData, ResponseData } from './apis';
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from 'express';

declare global {
  // env
  namespace NodeJS {
    interface ProcessEnv {
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
    }
  }
  // express
  type Request<T extends RequestData = any> = ExpressRequest<T['params'], null, T['body'], T['query']>;
  type Response<T extends ResponseData = any> = ExpressResponse<T>;
  type NextFunction = ExpressNextFunction;
}
