import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import * as Joi from 'joi';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    jest.mock('./user.service');

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
          validationSchema: Joi.object({
            JWT_SECRET: Joi.string().required(),
          }),
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '1h',
          },
        }),
      ],
      controllers: [UserController],
      providers: [UserService, DatabaseService, JwtStrategy],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  // it('should call the service', () => {
  //   const user: User = new User(
  //     1,
  //     'test_name',
  //     'test@email.net',
  //     'test_passwd',
  //     'test_callNum'
  //   );
  //   const createUserDto: CreateUserDto = new CreateUserDto(user);
  //   userController.signUp(createUserDto);
  //   expect(userService.register).toHaveBeenCalled();
  // });

  it('유저 전체 조회', async () => {
    const result = [
      {
        idx: 81,
        code: 'user_code1001',
        passwd: 'password_123',
        updatedAt: '2022-08-21T17:42:29.000Z',
        email: 'user_email1001@imweb.me',
        name: 'user_name1001',
        callnum: '010-1234-5678',
        createdAt: '2022-08-21T17:42:29.000Z',
        fk_user_site_code: null,
      },
      {
        idx: 82,
        code: 'user_code1002',
        passwd: 'password_123',
        updatedAt: '2022-08-21T17:42:29.000Z',
        email: 'user_email1002@imweb.me',
        name: 'user_name1002',
        callnum: '010-1234-5678',
        createdAt: '2022-08-21T17:42:29.000Z',
        fk_user_site_code: null,
      },
    ];
    jest.spyOn(userController, 'getAll').mockImplementation(async () => result);

    expect(await userController.getAll({ page: 1, perPage: 2 })).toBe(result);
  });
});
