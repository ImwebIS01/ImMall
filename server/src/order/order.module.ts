import { AppModule } from './../app.module';
import { MessageConsumer } from './../message.consumer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';
import { UsefulService } from 'src/useful/useful.service';
import { MessageProducerService } from 'src/message.producer.service';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    DatabaseService,
    ConfigService,
    UsefulService,
    MessageProducerService,
  ],
})
export class OrderModule {}
