import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as Joi from 'joi';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { GetMembershipDto } from './dto/get-membership.dto';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { Memberships } from '../mock-data';

describe('MembershipController', () => {
  let controller: MembershipController;
  let service: MembershipService;
  let memberships;

  beforeEach(async () => {
    jest.mock('./membership.service');
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembershipController],
      providers: [MembershipService, DatabaseService],
    }).compile();

    controller = module.get<MembershipController>(MembershipController);
    service = module.get<MembershipService>(MembershipService);

    /** mock-data */
    memberships = Memberships;
    /** 서비스 로직 구현부 모킹*/

    /** 전체 조회 */
    jest.spyOn(service, 'findAll').mockResolvedValue(memberships);

    /** 단일 조회 */
    jest.spyOn(service, 'findOne').mockImplementation((code: string) => {
      let result;
      memberships.forEach((element) => {
        if (element.code === code) {
          result = element;
        }
      });
      return result;
    });

    jest
      .spyOn(service, 'create')
      .mockImplementation(async (createMembershipDto: CreateMembershipDto) => {
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
});
