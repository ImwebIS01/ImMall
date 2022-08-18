import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, DatabaseModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
