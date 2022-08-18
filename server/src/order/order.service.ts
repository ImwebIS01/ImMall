import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { DatabaseService } from 'src/database/database.service';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly orderRepository: OrderRepository
  ) {}
  async register(createOrderDto: CreateOrderDto): Promise<boolean> {
    try {
      await this.orderRepository.create(createOrderDto);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<any> {
    try {
      return this.orderRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: number): Promise<Order> {
    try {
      return this.orderRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async setOne(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const order: Order = await this.orderRepository.findOne(id);

      console.log(updateOrderDto);
      const code = updateOrderDto.code ? updateOrderDto.code : order.code;
      const siteCode = updateOrderDto.siteCode
        ? updateOrderDto.siteCode
        : order.siteCode;
      const orderNumber = updateOrderDto.orderNumber
        ? updateOrderDto.orderNumber
        : order.orderNumber;
      const ordererEmail = updateOrderDto.ordererEmail
        ? updateOrderDto.ordererEmail
        : order.ordererEmail;
      const ordererName = updateOrderDto.ordererName
        ? updateOrderDto.ordererName
        : order.ordererName;
      const ordererCall = updateOrderDto.ordererCall
        ? updateOrderDto.ordererCall
        : order.ordererCall;
      const ordererCall2 = updateOrderDto.ordererCall2
        ? updateOrderDto.ordererCall2
        : order.ordererCall2;
      const orderTime = updateOrderDto.orderTime
        ? updateOrderDto.orderTime
        : order.orderTime;
      const completeTime = updateOrderDto.completeTime
        ? updateOrderDto.completeTime
        : order.completeTime;
      const count = updateOrderDto.count ? updateOrderDto.count : order.count;
      const price = updateOrderDto.price ? updateOrderDto.price : order.price;

      const newOrder: Order = new Order(
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
        price
      );
      await this.orderRepository.update(newOrder);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.orderRepository.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
