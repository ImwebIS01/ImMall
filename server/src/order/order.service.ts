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

      console.log(order);
      //   const username = updateOrderDto.username
      //     ? updateOrderDto.username
      //     : order.username;
      //   const email = updateOrderDto.email ? updateOrderDto.email : order.email;
      //   const password = updateOrderDto.password
      //     ? updateOrderDto.password
      //     : order.password;

      //   const newUser: Order = new Order(id, username, email, password);
      //   await this.orderRepository.update(newUser);
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
