import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { DatabaseService } from 'src/database/database.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GetUserDto } from '../dto/get-user.dto';
import * as dotenv from 'dotenv';
import { UserService } from '../user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const user = await this.userService.getOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('권한 없음');
    }
    return user;
  }
}
