import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {

    const responseMessage = this.reflector.get<string>(
      'response_message',
      context.getHandler(),
    );

    return next.handle().pipe(
      
      // map((data) => ({
        
      //   statusCode: context.switchToHttp().getResponse().statusCode,
      //   message:
      //     this.reflector.get<string>(
      //       'response_message',
      //       context.getHandler(),
      //     ) || '',
      //   data,
      // })),

      map((data) => {
        if (!responseMessage) {
          return data;
        }
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: responseMessage,
          data,
        };
      })
    );
  }
}