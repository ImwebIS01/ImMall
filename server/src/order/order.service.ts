import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * 주문서 생성 함수
   * @param createOrderDto
   * @returns
   */
  async register(createOrderDto: CreateOrderDto) {
    try {
      const {
        code,
        order_no,

        site_code,
        user_code,
        post_number,

        receiver_name,

        receiver_address,

        receiver_phone,

        receiver_phone2,
        status,

        total_price,
      }: CreateOrderDto = createOrderDto;
      return await this.databaseService.query(`
      INSERT INTO testA.order(
        code,

        order_no,

        site_code,

        user_code,

        post_number,

        receiver_name,

        receiver_address,

        receiver_phone,

        receiver_phone2,
        status,
        total_price)
        VALUES('${code}',
        '${order_no}',
        '${site_code}',
        '${user_code}',
        '${post_number}',
        '${receiver_name}',
        '${receiver_address}',
        '${receiver_phone}',
        '${receiver_phone2}',
        '${status}',
        '${total_price}')
        `);
    } catch (error) {
      throw error;
    }
  }
  /**
   * 주문 전체 확인 함수
   * @returns 생성일자 기준으로 전체 주문을 배열로 줍니다.
   */
  async getAll(): Promise<any> {
    try {
      const orders = await this.databaseService.query(
        `SELECT * 
        FROM testA.order 
        ORDER BY created_time DESC`
      );
      return orders[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * 주문 하나 불러오는 함수
   * @param idx 주문 idx 값
   * @returns 하나값만 불러와줌
   */
  async getOne(idx: number): Promise<CreateOrderDto> {
    try {
      const order = await this.databaseService.query(`
      SELECT * 
      FROM testA.order 
      WHERE id = ${idx};`);
      return order[0][0];
    } catch (error) {
      throw error;
    }
  }
  /**
   * 주문 업데이트 함수
   * @param idx 주문 idx 값
   * @param updateOrderDto
   */
  async setOne(idx: number, updateOrderDto: UpdateOrderDto) {
    try {
      const order: UpdateOrderDto = await this.getOne(idx);

      console.log(updateOrderDto);

      const code = updateOrderDto.code ? updateOrderDto.code : order.code;
      const order_no = updateOrderDto.order_no
        ? updateOrderDto.order_no
        : order.order_no;
      const site_code = updateOrderDto.site_code
        ? updateOrderDto.site_code
        : order.site_code;
      const user_code = updateOrderDto.user_code
        ? updateOrderDto.user_code
        : order.user_code;
      const created_time = updateOrderDto.created_time
        ? updateOrderDto.created_time
        : order.created_time;
      const updated_time = updateOrderDto.updated_time
        ? updateOrderDto.updated_time
        : order.updated_time;
      const delivered_time = updateOrderDto.delivered_time
        ? updateOrderDto.delivered_time
        : order.delivered_time;
      const post_number = updateOrderDto.post_number
        ? updateOrderDto.post_number
        : order.post_number;
      const receiver_name = updateOrderDto.receiver_name
        ? updateOrderDto.receiver_name
        : order.receiver_name;
      const receiver_address = updateOrderDto.receiver_address
        ? updateOrderDto.receiver_address
        : order.receiver_address;
      const receiver_phone = updateOrderDto.receiver_phone
        ? updateOrderDto.receiver_phone
        : order.receiver_phone;
      const receiver_phone2 = updateOrderDto.receiver_phone2
        ? updateOrderDto.receiver_phone2
        : order.receiver_phone2;
      const total_price = updateOrderDto.total_price
        ? updateOrderDto.total_price
        : order.total_price;

      return this.databaseService.query(`
      UPDATE testA.order
      SET
      code='${code}',
      order_no='${order_no}',
      site_code='${site_code}',
      user_code='${user_code}',
      created_time='${created_time}',
      updated_time='${updated_time}',
      delivered_time='${delivered_time}',
      post_number='${post_number}',
      receiver_name='${receiver_name}',
      receiver_address='${receiver_address}',
      receiver_phone='${receiver_phone}',
      receiver_phone2='${receiver_phone2}',
      total_price= '${total_price}'
      WHERE id=${idx};
      `);
    } catch (error) {
      throw error;
    }
  }
  /**
   * 주문 삭제 함수
   * @param idx idx값으로 찾습니다.
   * @returns 리턴값은 없습니다.
   */
  async remove(idx: number) {
    try {
      await this.databaseService.query(`
      DELETE from testA.order
      WHERE id=${idx}
      `);
    } catch (error) {
      throw error;
    }
  }
}
