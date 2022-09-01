import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { GetUserDto } from './dto/get-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('MembershipController', () => {
  let controller: UserController;
  let service: UserService;
  let users;

  beforeEach(async () => {
    jest.mock('./user.service');
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule],
      controllers: [UserController],
      providers: [UserService, DatabaseService, ConfigService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

    /** mock-data */
    // users = Users;
    /** 서비스 로직 구현부 모킹 함수입니다. */

    /** 전체 조회 */
    jest.spyOn(service, 'getAll').mockResolvedValue(users);

    /** 단일 조회(code) */
    jest
      .spyOn(service, 'getOne')
      .mockImplementation((code: string): Promise<GetUserDto> => {
        let result;
        users.forEach((user) => {
          if (user.code === code) {
            result = user;
          }
        });
        return result;
      });

    /** 단일 조회(idx) */
    jest.spyOn(service, 'getOneByIdx').mockImplementation((idx: number) => {
      let result;
      users.forEach((user) => {
        if (user.idx === idx) {
          result = user;
        }
      });
      return result;
    });

    /** 단일 조회(email) */
    jest.spyOn(service, 'getOneByEmail').mockImplementation((email: string) => {
      let result;
      users.forEach((user) => {
        if (user.email === email) {
          result = user;
        }
      });
      return result;
    });
    /** 멤버쉽 추가 */
    jest
      .spyOn(service, 'create')
      .mockImplementation(
        async (createMembershipDto: CreateMembershipDto) => {}
      );

    /** 멤버쉽 수정 */
    jest
      .spyOn(service, 'update')
      .mockImplementation(
        async (code: string, updateMembershipDto: UpdateMembershipDto) => {
          try {
            let target;
            for (let i in memberships) {
              if (memberships[i].code === code) {
                memberships[i].level = updateMembershipDto.level
                  ? updateMembershipDto.level
                  : memberships[i].level;
                memberships[i].point_rage = updateMembershipDto.point_rage
                  ? updateMembershipDto.point_rage
                  : memberships[i].point_rage;
                break;
              }
            }
            return true;
          } catch (error) {
            throw error;
          }
        }
      );

    /** 멤버쉽 삭제 */
    jest.spyOn(service, 'remove').mockImplementation(async (code) => {
      memberships = memberships.filter((v) => v.code !== code);
      return true;
    });
  });

  it('멤버쉽 컨트롤러 정의', () => {
    expect(controller).toBeDefined();
  });

  it('멤버쉽 서비스 정의', () => {
    expect(service).toBeDefined();
  });

  describe('멤버쉽 전체 조회', () => {
    it('단일 멤버쉽 항목이 조회되어야 함', async () => {
      expect(await controller.findAll()).toBe(memberships);
    });
  });

  describe('멤버쉽 단일 조회', () => {
    it('단일 멤버쉽 항목이 조회되어야 함', async () => {
      expect(await controller.findOne('test_code_number2')).toBe(
        memberships[1]
      );
    });
  });

  describe('멤버쉽 추가', () => {
    it('멤버쉽 항목이 추가되어야 함', async () => {
      expect(
        await controller.create({
          code: 'test_code_number4',
          level: 4,
          point_rage: 4,
        })
      ).toBe(true);
    });
  });

  describe('멤버쉽 수정', () => {
    it('멤버쉽 항목이 삭제되어야 함', async () => {
      expect(
        await controller.update('test_code_number4', {
          level: 4,
          point_rage: 4,
        })
      ).toBe(true);
    });
  });

  describe('멤버쉽 삭제', () => {
    it('멤버쉽 항목이 삭제되어야 함', async () => {
      expect(await controller.remove('test_code_number4')).toBe(true);
    });
  });
});
