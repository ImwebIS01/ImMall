import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';
import { UsefulService } from 'src/useful/useful.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService, DatabaseService, ConfigService, UsefulService],
})
export class OrderModule {}
