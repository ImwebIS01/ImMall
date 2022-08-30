import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
      }),
    }),
  ],

  controllers: [MembershipController],
  providers: [MembershipService, DatabaseService],
})
export class MembershipModule {}
