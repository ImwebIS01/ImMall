import { ConfigModule } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
const ENV = process.env.NODE_ENV;
Logger.debug(ENV);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${ENV}`,
    }),
    UserModule,
    DatabaseModule,
    OrderModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
