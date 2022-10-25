import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { RefundController } from './refund.controller';
import { RefundService } from './refund.service';

describe('RefundController', () => {
  let controller: RefundController;
  let service: RefundService;

  let refunds = [];
  for (let i = 0; i < 3; i++) {
    refunds.push({
      idx: i,
      code: `test_code${i}`,
      amount: 100,
      reason_type: `test_reason_type${i}`,
      reason_detail: `test_reason_detail${i}`,
      fk_order_code: `teat_order_code${i}`,
      fk_site_code: `test_site_code${i}`,
    });
  }
  beforeEach(async () => {
    jest.mock('./refund.service');
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule],
      controllers: [RefundController],
      providers: [RefundService, DatabaseService, ConfigService],
    }).compile();

    controller = module.get<RefundController>(RefundController);
    service = module.get<RefundService>(RefundService);

    /** 전체 조회 */
    jest.spyOn(service, 'findAll').mockResolvedValue(refunds);

    /** 단일 조회 */
    jest.spyOn(service, 'findOne').mockImplementation((code: string) => {
      let result;
      refunds.forEach((element) => {
        if (element.code === code) {
          result = element;
        }
      });
      return result;
    });
    /** 상품 추가 */
    jest
      .spyOn(service, 'create')
      .mockImplementation(async (createRefundDto: CreateRefundDto) => {
        try {
          refunds.push({
            idx: 4,
            code: `test_code4`,
            amount: 100,
            reason_type: `test_reason_type4`,
            reason_detail: `test_reason_detail4`,
            fk_order_code: `teat_order_code4`,
            fk_site_code: `test_site_code4`,
          });
          if (refunds[3]) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          throw error;
        }
      });

    /** 상품 수정 */
    jest
      .spyOn(service, 'update')
      .mockImplementation(
        async (code: string, updateRefundDto: UpdateRefundDto) => {
          try {
            for (const i in refunds) {
              if (refunds[i].code === code) {
                refunds[i].amount = updateRefundDto.amount
                  ? updateRefundDto.amount
                  : refunds[i].amount;
                refunds[i].reason_type = updateRefundDto.reason_type
                  ? updateRefundDto.reason_type
                  : refunds[i].reason_type;
                refunds[i].reason_detail = updateRefundDto.reason_detail
                  ? updateRefundDto.reason_detail
                  : refunds[i].reason_detail;
                refunds[i].fk_order_code = updateRefundDto.fk_order_code
                  ? updateRefundDto.fk_order_code
                  : refunds[i].fk_order_code;
                refunds[i].fk_site_code = updateRefundDto.fk_site_code
                  ? updateRefundDto.fk_site_code
                  : refunds[i].fk_site_code;
                break;
              }
            }
            return true;
          } catch (error) {
            throw error;
          }
        }
      );

    /** 상품 삭제 */
    jest.spyOn(service, 'remove').mockImplementation(async (code) => {
      refunds = refunds.filter((v) => v.code !== code);
      return true;
    });
  });

  it('환불 컨트롤러 정의', () => {
    expect(controller).toBeDefined();
  });

  it('환불 서비스 정의', () => {
    expect(service).toBeDefined();
  });

  describe('환불 단일 조회', () => {
    it('환불 항목이 조회되어야 함', async () => {
      expect(await controller.findOne('test_code2')).toBe(refunds[2]);
    });
  });

  // describe('환불 추가', () => {
  //   it('환불 항목이 추가되어야 함', async () => {
  //     expect(
  //       await controller.create(,`test_site_code4`, {
  //         code: `test_code4`,
  //         amount: 100,
  //         reason_type: `test_reason_type4`,
  //         reason_detail: `test_reason_detail4`,
  //         fk_order_code: `teat_order_code4`,
  //         fk_site_code: `test_site_code4`,
  //       })
  //     ).toBe(true);
  //   });
  // });

  describe('상품 수정', () => {
    it('상품 항목이 수정되어야 함', async () => {
      expect(
        await controller.update(`test_code4`, {
          amount: 50,
          reason_type: `test_reason_type4`,
          reason_detail: `test_reason_detail4`,
          fk_order_code: `teat_order_code4`,
          fk_site_code: `test_site_code4`,
        })
      ).toBe(true);
    });
  });

  describe('상품 삭제', () => {
    it('상품 항목이 삭제되어야 함', async () => {
      expect(await controller.remove(`test code5`)).toBe(true);
    });
  });
});
