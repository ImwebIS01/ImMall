import { UsefulService } from 'src/useful/useful.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DatabaseService } from 'src/database/database.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GetOrderDto } from './dto/get-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly usefulService: UsefulService,
    private readonly databaseService: DatabaseService
  ) {}

  /**
   * 주문서 생성 함수
   * @param createOrderDto
   * @returns boolean 값으로 리턴 'true'/'false'
   */
  async create(
    productCode: string,
    createOrderDto: CreateOrderDto
  ): Promise<boolean> {
    const con = await this.databaseService.getConnection();
    if (!con) {
      throw new Error();
    }
    try {
      //트랙잭션 시작
      await con.beginTransaction();
      const ordersCode = await this.databaseService.genCode();
      //오더 생성 쿼리
      await con.query(`
      INSERT INTO orders(
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
        VALUES('${ordersCode}',
        '${createOrderDto.order_no}',
        '${createOrderDto.site_code}',
        '${createOrderDto.user_code}',
        '${createOrderDto.post_number}',
        '${createOrderDto.receiver_name}',
        '${createOrderDto.receiver_address}',
        '${createOrderDto.receiver_phone}',
        '${createOrderDto.receiver_phone2}',
        '${createOrderDto.status}',
        '${createOrderDto.total_price}')
        `);

      const orderProductCode = await this.databaseService.genCode();
      //oder_product 다대다 연결 데이터 삽입
      await con.query(
        `INSERT INTO order_product(code,fk_order_code,fk_product_code) VALUES('${orderProductCode}','${ordersCode}','${productCode}')`
      );
      const pointCode = await this.databaseService.genCode();
      const point = this.usefulService.saveUpPoint(createOrderDto.total_price);
      //포인트 적립
      await con.query(
        `INSERT INTO points(code,fk_user_code,point,expire_date) VALUES('${pointCode}','${
          createOrderDto.user_code
        }','${point}','${this.usefulService.expireDatePoint()}')`
      );
      const pointAppliedCode = await this.databaseService.genCode();
      // 포인트 적립 다대다 연결 데이터 삽입
      await con.query(
        `INSERT INTO point_applied(code,value,fk_point_code,fk_order_code) VALUES('${pointAppliedCode}','${point}','${pointCode}','${ordersCode}')`
      );

      //커밋
      await con.commit();
      return true;
    } catch (error) {
      //에러 발생시 롤백
      await con.rollback();
      throw error;
    } finally {
      //항상 커넥션 풀 회수
      con.release();
    }
  }
  /**
   * 주문 전체 확인 함수
   * @returns 생성일자 기준으로 전체 주문을 배열로 줍니다.
   */
  async findAll(): Promise<any> {
    const con = await this.databaseService.getConnection();
    if (!con) {
      throw new Error();
    }
    try {
      const ordersRowData = await con.query(
        `SELECT * 
        FROM orders;`
      );
      return ordersRowData[0];
    } catch (error) {
      throw error;
    } finally {
      con.release();
    }
  }

  /**
   * 주문 하나 불러오는 함수
   * @param code 주문 code 값
   * @returns 하나값만 불러와줌
   */
  async findOne(code: string): Promise<GetOrderDto> {
    const con = await this.databaseService.getConnection();
    if (!con) {
      throw new Error();
    }
    try {
      const orderRowData = await con.query(`
      SELECT * 
      FROM orders 
      WHERE code = "${code}"`);
      return orderRowData[0][0];
    } catch (error) {
      throw error;
    } finally {
      con.release();
    }
  }
  /**
   * 주문 업데이트 함수
   * @param code 주문 code 값
   * @param updateOrderDto
   */
  async update(code: string, updateOrderDto: UpdateOrderDto): Promise<boolean> {
    const con = await this.databaseService.getConnection();
    if (!con) {
      throw new Error();
    }
    try {
      const existingData = (
        await con.query(`
      SELECT 
      post_number,
      receiver_name,
      receiver_address,
      receiver_phone,
      receiver_phone2,
      total_price FROM orders WHERE code="${code}";
      `)
      )[0][0];
      const post_number = updateOrderDto.post_number
        ? updateOrderDto.post_number
        : existingData.post_number;
      const receiver_name = updateOrderDto.receiver_name
        ? updateOrderDto.receiver_name
        : existingData.receiver_name;
      const receiver_address = updateOrderDto.receiver_address
        ? updateOrderDto.receiver_address
        : existingData.receiver_address;
      const receiver_phone = updateOrderDto.receiver_phone
        ? updateOrderDto.receiver_phone
        : existingData.receiver_phone;
      const receiver_phone2 = updateOrderDto.receiver_phone2
        ? updateOrderDto.receiver_phone2
        : existingData.receiver_phone2;
      const total_price = updateOrderDto.total_price
        ? updateOrderDto.total_price
        : existingData.total_price;

      await con.query(`
      UPDATE orders
      SET
      post_number='${post_number}',
      receiver_name='${receiver_name}',
      receiver_address='${receiver_address}',
      receiver_phone='${receiver_phone}',
      receiver_phone2='${receiver_phone2}',
      total_price= '${total_price}'
      WHERE code="${code}";
      `);
      return true;
    } catch (error) {
      throw error;
    } finally {
      con.release();
    }
  }
  /**
   * 주문 삭제 함수
   * @param code code값으로 찾습니다.
   * @returns 리턴값은 없습니다.
   */
  async remove(code: string): Promise<boolean> {
    const con = await this.databaseService.getConnection();
    if (!con) {
      throw new Error();
    }
    try {
      await con.query(`
      DELETE from orders
      WHERE code="${code}";
      `);
      return true;
    } catch (error) {
      throw error;
    } finally {
      con.release();
    }
  }
}
