import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(createOrderDto: CreateOrderDto) {
    const {
      code,

      siteCode,

      orderNumber,

      ordererEmail,

      ordererName,

      ordererCall,

      ordererCall2,

      orderTime,

      completeTime,

      count,

      price,
    }: CreateOrderDto = createOrderDto;
    return await this.databaseService.query(`
    INSERT INTO test1.order
    (
      code,
      siteCode,
      orderNumber,
      ordererEmail,
      ordererName,
      ordererCall,
      ordererCall2,
      orderTime,
      completeTime,
      count,
      price
    )
    VALUES ("${code}","${siteCode}","${orderNumber}","${ordererEmail}","${ordererName}","${ordererCall}","${ordererCall2}","${orderTime}","${completeTime}",${count},${price});

`);
  }

  async findAll() {
    const orders = await this.databaseService.query(`
    SELECT * FROM test1.order ORDER BY createdAt DESC;
    `);
    console.log(orders[0]);
    return orders[0];
  }

  async findOne(id: number) {
    try {
      const order = await this.databaseService.query(`
          SELECT * 
          FROM test1.order 
          WHERE id = ${id};`);
      return order[0][0];
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.databaseService.query(`
          SELECT * 
          FROM test1.order 
          WHERE email = ${email};`);
      return user[0][0];
    } catch (error) {
      throw error;
    }
  }

  async update(order: Order) {
    const {
      id,
      code,
      siteCode,
      orderNumber,
      ordererEmail,
      ordererName,
      ordererCall,
      ordererCall2,
      orderTime,
      completeTime,
      count,
      price,
    }: Order = order;
    return this.databaseService.query(`
      UPDATE test1.order
      SET
      code='${code}',
      siteCode='${siteCode}',
      orderNumber='${orderNumber}',
      ordererEmail='${ordererEmail}',
      ordererName='${ordererName}',
      ordererCall='${ordererCall}',
      ordererCall2='${ordererCall2}',
      orderTime='${orderTime}',
      completeTime='${completeTime}',
      count='${count}',
      price='${price}'
      WHERE id=${id};
      `);
  }

  async remove(id: number) {
    try {
      return await this.databaseService.query(`
          DELETE from test1.order
          WHERE id=${id}
          `);
    } catch (error) {
      throw error;
    }
  }
}
