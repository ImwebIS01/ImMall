import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { MembershipModule } from './membership/membership.module';

@Module({
  imports: [UserModule, DatabaseModule, OrderModule, ProductsModule, MembershipModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
