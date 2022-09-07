import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { UserMockData } from 'src/mock-data';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let users: GetUserDto[];

  beforeEach(async () => {
    jest.mock('./user.service');

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule,
      ],
      exports: [UserService, JwtStrategy, PassportModule],
      controllers: [UserController],
      providers: [UserService, DatabaseService, JwtStrategy, ConfigService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

    /** mock-data */
    users = UserMockData;

    /** 서비스 로직 구현부 모킹함수 입니다.  */

    /** 멤버쉽 추가 */
    jest
      .spyOn(service, 'register')
      .mockImplementation(async (createUserDto: CreateUserDto) => {
        const newUser: GetUserDto = {
          idx: 4,
          code: 'test_code_4',
          passwd: createUserDto.passwd,
          updated_time: new Date('2022-09-01T17:54:55.000Z'),
          email: createUserDto.email,
          name: createUserDto.name,
          callnum: createUserDto.callnum,
          created_time: new Date('2022-09-01T17:54:55.000Z'),
          fk_membership_code: createUserDto.fk_membership_code,
          fk_site_code: createUserDto.fk_site_code,
        };
        return true;
      });

    /** 전체 조회 */
    jest.spyOn(service, 'getAllOffset').mockResolvedValue(users);

    jest.spyOn(service, 'getAllCursor').mockResolvedValue(users);

    /** 사이트별 조회 */
    jest
      .spyOn(service, 'getAllBySiteOffset')
      .mockImplementation(
        async (
          page: number,
          perPage: number,
          site: string
        ): Promise<GetUserDto[]> => {
          const result = [];
          for (const i in users) {
            if (site === users[i].fk_site_code) {
              result.push(users[i]);
            }
          }
          return result;
        }
      );

    jest
      .spyOn(service, 'getAllBySiteCursor')
      .mockImplementation(
        async (
          perPage: number,
          code: string,
          site: string
        ): Promise<GetUserDto[]> => {
          const result = [];
          for (const i in users) {
            if (site === users[i].fk_site_code) {
              result.push(users[i]);
            }
          }
          return result;
        }
      );

    /** 단일 조회(code) */
    jest
      .spyOn(service, 'getOne')
      .mockImplementation((code: string): Promise<GetUserDto> => {
        let result;
        users.forEach((element) => {
          if (element.code === code) {
            result = element;
          }
        });
        return result;
      });

    /** 단일 조회(idx) */
    jest
      .spyOn(service, 'getOneByIdx')
      .mockImplementation((idx: number): Promise<GetUserDto> => {
        let result;
        users.forEach((element) => {
          if (element.idx === idx) {
            result = element;
          }
        });
        return result;
      });

    /** 단일 조회(code) */
    jest
      .spyOn(service, 'getOneByEmail')
      .mockImplementation((email: string): Promise<GetUserDto> => {
        let result;
        users.forEach((element) => {
          if (element.email === email) {
            result = element;
          }
        });
        return result;
      });

    jest
      .spyOn(service, 'setOne')
      .mockImplementation(
        async (
          code: string,
          updateUserDto: UpdateUserDto
        ): Promise<boolean> => {
          for (const i in users) {
            if (users[i].code === code) {
              users[i].name = updateUserDto.name
                ? updateUserDto.name
                : updateUserDto[i].name;
              users[i].passwd = updateUserDto.passwd
                ? updateUserDto.passwd
                : updateUserDto[i].passwd;
              users[i].email = updateUserDto.email
                ? updateUserDto.email
                : updateUserDto[i].email;
              users[i].callnum = updateUserDto.callnum
                ? updateUserDto.callnum
                : updateUserDto[i].callnum;
              break;
            }
          }
          return true;
        }
      );

    jest.spyOn(service, 'remove').mockImplementation(async (code) => {
      users = users.filter((v) => v.code !== code);
      return true;
    });
  });

  it('유저 컨트롤러 정의', () => {
    expect(controller).toBeDefined();
  });

  it('유저 서비스 정의', () => {
    expect(service).toBeDefined();
  });
});
