
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Warning } from '../utils/error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    if (exception instanceof Warning) {
      httpAdapter.reply(ctx.getResponse(), { message: exception.message }, exception.code)
    } else if (exception instanceof HttpException) {
      httpAdapter.reply(ctx.getResponse(), exception.getResponse(), exception.getStatus());
    } else if (exception instanceof Error) {
      const httpStatus = HttpStatus.BAD_REQUEST;

      const responseBody = "Serviço indisponível no momento, por favor tente novamente mais tarde.";

      this.logger.error({
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        error: exception.message,
      })

      httpAdapter.reply(ctx.getResponse(), { message: responseBody }, httpStatus);
    }
  }
}