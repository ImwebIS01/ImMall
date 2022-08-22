import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user/entities/user.entity';

// @GetUser: Reqeust에서 user 가져오기
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
