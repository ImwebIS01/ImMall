import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { MembershipsMockData } from '../mock-data';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GetMembershipDto } from './dto/get-membership.dto';

describe('MembershipController', () => {
  let controller: MembershipController;
  let service: MembershipService;
  let memberships: GetMembershipDto[];

  beforeEach(async () => {
    jest.mock('./membership.service');
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule],
      controllers: [MembershipController],
      providers: [MembershipService, DatabaseService, ConfigService],
    }).compile();

    controller = module.get<MembershipController>(MembershipController);
    service = module.get<MembershipService>(MembershipService);

    /** mock-data */
    memberships = MembershipsMockData;
    /** 서비스 로직 구현부 모킹 함수입니다. */

    /** 멤버쉽 추가 */
    jest
      .spyOn(service, 'create')
      .mockImplementation(async (createMembershipDto: CreateMembershipDto) => {
        try {
          memberships.push({
            idx: 4,
            code: 'test_code_number4',
            level: 4,
            point_rage: 4,
          });
          if (memberships[3]) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          throw error;
        }
      });

    /** 전체 조회 */
    jest.spyOn(service, 'findAll').mockResolvedValue(memberships);

    /** 단일 조회 */
    jest
      .spyOn(service, 'findOne')
      .mockImplementation((code: string): Promise<GetMembershipDto> => {
        let result;
        memberships.forEach((element) => {
          if (element.code === code) {
            result = element;
          }
        });
        return result;
      });

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
