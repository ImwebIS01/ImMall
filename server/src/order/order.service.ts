import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetOrderDto } from './dto/get-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService
  ) {}

  /**
   * 주문서 생성 함수
   * @param createOrderDto
   * @returns boolean 값으로 리턴 'true'/'false'
   */
  async create(createOrderDto: CreateOrderDto): Promise<boolean> {
    try {
      const con = await this.databaseService.getConnection();
      const code = await this.databaseService.genCode();
      await con.query(`
      INSERT INTO ${this.configService.get('DB_NAME')}.order(
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
      return true;
    } catch (error) {
      throw error;
    }
  }
  /**
   * 주문 전체 확인 함수
   * @returns 생성일자 기준으로 전체 주문을 배열로 줍니다.
   */
  async findAll(): Promise<any> {
    try {
      const con = await this.databaseService.getConnection();
      const ordersRowData = await con.query(
        `SELECT * 
        FROM ${this.configService.get('DB_NAME')}.order;`
      );
      return ordersRowData[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * 주문 하나 불러오는 함수
   * @param code 주문 code 값
   * @returns 하나값만 불러와줌
   */
  async findOne(code: string): Promise<GetOrderDto> {
    try {
      const con = await this.databaseService.getConnection();
      const orderRowData = await con.query(`
      SELECT * 
      FROM ${this.configService.get('DB_NAME')}.order 
      WHERE code = "${code}"`);
      //Promise에서 리턴타입으로 Dto를 검사하고 있는데 다시 검사하는 로직인가용?
      //제가 잘못 이해한거라면 설명 부탁드립니다!ㅎㅎ
      //const order: GetOrderDto = orderRowData[0][0]; <<
      return orderRowData[0][0];
    } catch (error) {
      throw error;
    }
  }
  /**
   * 주문 업데이트 함수
   * @param code 주문 code 값
   * @param updateOrderDto
   */
  async update(code: string, updateOrderDto: UpdateOrderDto): Promise<boolean> {
    try {
      const con = await this.databaseService.getConnection();
      const existingData = (
        await con.query(`
      SELECT 
      post_number,
      receiver_name,
      receiver_address,
      receiver_phone,
      receiver_phone2,
      total_price FROM ${this.configService.get(
        'DB_NAME'
      )}.order WHERE code="${code}";
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
      UPDATE ${this.configService.get('DB_NAME')}.order
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
    }
  }
  /**
   * 주문 삭제 함수
   * @param code code값으로 찾습니다.
   * @returns 리턴값은 없습니다.
   */
  async remove(code: string): Promise<boolean> {
    try {
      const con = await this.databaseService.getConnection();
      await con.query(`
      DELETE from ${this.configService.get('DB_NAME')}.order
      WHERE code="${code}";
      `);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
