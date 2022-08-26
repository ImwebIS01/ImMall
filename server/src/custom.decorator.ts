import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetUserDto } from './user/dto/get-user.dto';

// @GetUser: Reqeust에서 user 가져오기
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): GetUserDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
