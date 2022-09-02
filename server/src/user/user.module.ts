import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'as!daQ213GW$321.AW2s51%Wa',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  exports: [UserService, JwtStrategy, PassportModule],
  controllers: [UserController],
  providers: [UserService, DatabaseService, JwtStrategy, ConfigService],
})
export class UserModule {}
