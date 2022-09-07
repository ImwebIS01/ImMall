import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '@nestjs/common';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    Logger.log(`Receive request from ${req.method} ${req.originalUrl}`);
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => Logger.log(`::::::time taken:::: ${Date.now() - now}ms`))
      );
  }
}
