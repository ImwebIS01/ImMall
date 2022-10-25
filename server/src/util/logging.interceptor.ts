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
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    Logger.log(`${req.method} ${req.originalUrl}`, 'Receive request from ');
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        Logger.log(`${Date.now() - now}ms`, 'time taken');
      })
    );
  }
}
