import { Test, TestingModule } from '@nestjs/testing';
import { RefundService } from './refund.service';
import { GetRefundDto } from './dto/get-refund.dto';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/database/database.service';
import { RefundModule } from './refund.module';
import { RefundMockData } from 'src/mock-data';
import * as Joi from 'joi';

describe('RefundService', () => {
  let service: RefundService;
  let dbService: DatabaseService;
  let refunds: GetRefundDto[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RefundModule, DatabaseModule, ConfigModule],
      providers: [RefundService, DatabaseService, ConfigService],
    }).compile();

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/config/env/.development.env`,
      validationSchema: Joi.object({
        //NODE_ENV: Joi.string().valid('development', 'stage').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
      (service = module.get<RefundService>(RefundService));
    dbService = module.get<DatabaseService>(DatabaseService);

    refunds = RefundMockData;
    //jest.spyOn(dbService, 'getConnection').mockReturnValue();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(dbService).toBeDefined();
  });

  describe('create', () => {
    it('환불정보 생성', async () => {
      const result = await service.create('4cf4f5d3ad696f4599e17a5f5d93745a', {
        amount: 99,
        reason_type: 'test_reason_type',
        reason_detail: 'test_reason_detail',
        fk_order_code: '4234e16763a34117b114945a3a61ee69',
        fk_site_code: '4b682029c60608e4a414f57b412aaa4b',
      });
      const refundCode = Object.values(result)[1];
      console.log(result);
      expect(result).toEqual({ code: refundCode, success: true });
    });
  });
  describe('findAll', () => {
    it('전체 환불정보 가져오기', async () => {
      const perPage = 5;
      const code = '465b1e5b1ebb83dc8fe8c0948b4597d9';
      const site_code = '4b682029c60608e4a414f57b412aaa4b';
      const result = await service.findAll(perPage, code, site_code);
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeLessThanOrEqual(5);
    });
  });

  describe('findOne', () => {
    it('Code값으로 하나의 환불정보 가져오기', async () => {
      const result = await service.findOne('465b1e5b1ebb83dc8fe8c0948b4597d9');
      expect(result).toEqual({
        idx: 192,
        code: '465b1e5b1ebb83dc8fe8c0948b4597d9',
        amount: 100,
        reason_type: 'gnang',
        reason_detail: 'break product',
        updated_time: `2022/09/08`,
        created_time: `2022/09/08`,
        fk_order_code: '4234e16763a34117b114945a3a61ee69',
        fk_site_code: '4b682029c60608e4a414f57b412aaa4b',
      });
    });

    it('Code값으로 하나의 환불정보 가져오기 실패 - 존재하지 않는 게시글', async () => {
      const failIdx = 'failIdx';
      const result = await service.findOne(failIdx);
      expect(result).toEqual(undefined);
    });
  });
});
