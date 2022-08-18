import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { DatabaseService } from 'src/database/database.service';
import { User } from '../entities/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../user.repository';

export class JwtStrategy extends PassportStrategy(Strategy) {
  userRepository: UserRepository;
  constructor(private databaseService: DatabaseService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const user: User = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('권한 없음');
    }
    return user;
  }
}
