import { UpdateOrderDto } from './dto/update-order.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Orders } from '../mock-data';
import { DatabaseModule } from 'src/database/database.module';
import { OrderService } from './order.service';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;
  let orders;
  const productCode = 'test';
  beforeEach(async () => {
    jest.mock('./order.service');
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule],
      controllers: [OrderController],
      providers: [OrderService, DatabaseService, ConfigService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
    /** mock-data */
    orders = Orders;
    /** 서비스 로직 구현부 모킹 함수입니다. */

    /** 전체 조회 */
    jest.spyOn(service, 'findAll').mockResolvedValue(orders);
    /** 단일 조회 */
    jest.spyOn(service, 'findOne').mockImplementation((code: string) => {
      let result;
      orders.forEach((element) => {
        if (element.code === code) {
          result = element;
        }
      });
      return result;
    });
    /** 오더 추가 */
    jest
      .spyOn(service, 'create')
      .mockImplementation(
        async (productCode, createOrderDto: CreateOrderDto) => {
          try {
            orders.push({
              idx: 4,
              code: 'test_code_number4',
              order_no: 'test4',
              updated_time: '2022-01-09',
              created_time: '2022-01-01',
              delivered_time: '2022-01-10',
              site_code: 'site_1',
              user_code: 'user4',
              post_number: 112,
              receiver_name: '김테스트4',
              receiver_address: '서울특별시 테스트구 테스트동',
              receiver_phone: '01089887777',
              receiver_phone2: '01077776666',
              status: '배송중',
              total_price: 1000,
            });
            if (orders[3]) {
              return true;
            } else {
              return false;
            }
          } catch (error) {
            throw error;
          }
        }
      );

    /** 오더 수정 */
    jest
      .spyOn(service, 'update')
      .mockImplementation(
        async (code: string, updateOrderDto: UpdateOrderDto) => {
          try {
            for (const i in orders) {
              if (orders[i].code === code) {
                orders[i].post_number = updateOrderDto.post_number
                  ? updateOrderDto.post_number
                  : orders[i].post_number;
                orders[i].receiver_name = updateOrderDto.receiver_name
                  ? updateOrderDto.receiver_name
                  : orders[i].receiver_name;
                orders[i].receiver_address = updateOrderDto.receiver_address
                  ? updateOrderDto.receiver_address
                  : orders[i].receiver_address;
                orders[i].receiver_phone = updateOrderDto.receiver_phone
                  ? updateOrderDto.receiver_phone
                  : orders[i].receiver_phone;
                orders[i].receiver_phone2 = updateOrderDto.receiver_phone2
                  ? updateOrderDto.receiver_phone2
                  : orders[i].receiver_phone2;
                orders[i].status = updateOrderDto.status
                  ? updateOrderDto.status
                  : orders[i].status;
                orders[i].total_price = updateOrderDto.total_price
                  ? updateOrderDto.total_price
                  : orders[i].total_price;
                break;
              }
            }
            return true;
          } catch (error) {
            throw error;
          }
        }
      );
    /** 오더 삭제 */
    jest.spyOn(service, 'remove').mockImplementation(async (code) => {
      orders = orders.filter((element) => element.code !== code);
      return true;
    });
  });
  it('오더 컨트롤러 정의', () => {
    expect(controller).toBeDefined();
  });
  it('오더 서비스 정의', () => {
    expect(service).toBeDefined();
  });

  describe('오더 전체 조회', () => {
    it('전체 오더 항목이 조회되어야 함', async () => {
      expect(await controller.findAll()).toBe(orders);
    });
  });
  describe('오더 단일 조회', () => {
    it('단일 오더 항목이 조회되어야 함', async () => {
      expect(await controller.findOne('test_code_number3')).toBe(orders[1]);
    });
  });

  describe('오더 추가', () => {
    it('오더 항목이 추가되어야 함', async () => {
      expect(
        await controller.create(productCode, {
          idx: 4,
          code: 'test_code_number4',
          order_no: 'test4',
          updated_time: '2022-01-09',
          created_time: '2022-01-01',
          delivered_time: '2022-01-10',
          site_code: 'site_1',
          user_code: 'user4',
          post_number: 112,
          receiver_name: '김테스트4',
          receiver_address: '서울특별시 테스트구 테스트동',
          receiver_phone: '01089887777',
          receiver_phone2: '01077776666',
          status: '배송중',
          total_price: 1000,
        })
      ).toBe(true);
    });
  });
  describe('오더 수정', () => {
    it('오더 항목이 수정되어야 함', async () => {
      expect(
        await controller.update('test_code_number4', {
          post_number: 114,
          receiver_name: '김테스트4',
          receiver_address: '서울특별시 테스트구 테스트동',
          receiver_phone: '01089887777',
          receiver_phone2: '01077776666',
          status: '배송중',
          total_price: 1000,
        })
      ).toBe(true);
    });
  });
  describe('오더 삭제', () => {
    it('오더 항목이 삭제 되어야 함', async () => {
      expect(await controller.remove('test_code_number1')).toBe(true);
    });
  });
});
