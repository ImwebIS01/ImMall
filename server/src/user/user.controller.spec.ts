import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { config } from 'dotenv';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    jest.mock('./user.service');
    config();
    console.log(process.env.JWT_SECRET);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '1h',
          },
        }),
      ],
      exports: [UserService, JwtStrategy, PassportModule],
      controllers: [UserController],
      providers: [UserService, DatabaseService, JwtStrategy, ConfigService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('유저 컨트롤러 정의', () => {
    expect(controller).toBeDefined();
  });

  it('유저 서비스 정의', () => {
    expect(service).toBeDefined();
  });
});
