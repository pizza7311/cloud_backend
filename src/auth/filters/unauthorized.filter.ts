import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * unauthorized 익셉션 발생시 false 리스폰스.
 * 나머지 익셉션은 그대로 전달.
 */

@Catch(HttpException)
export class UnauthorizedFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    if (status === 401) response.send(false);
    else {
      response.status(status).send(exception.getResponse());
    }
  }
}
