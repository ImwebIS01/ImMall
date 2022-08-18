import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { OrderRepository } from './order.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService, DatabaseService, OrderRepository],
})
export class OrderModule {}
