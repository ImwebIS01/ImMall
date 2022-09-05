import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { MembershipModule } from './membership/membership.module';
import { SiteModule } from './site/site.module';
import { RefundModule } from './refund/refund.module';
import { PointsController } from './points/points.controller';
import { PointsService } from './points/points.service';
import { PointsModule } from './points/points.module';
import * as Joi from 'joi';

const ENV = process.env.NODE_ENV;
Logger.debug(ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/config/env/.${ENV}.env`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'stage').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    UserModule,
    DatabaseModule,
    OrderModule,
    ProductsModule,
    MembershipModule,
    SiteModule,
    RefundModule,
    PointsModule,
  ],
  controllers: [AppController, PointsController],
  providers: [AppService, PointsService],
})
export class AppModule {}
