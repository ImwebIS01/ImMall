import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/database/database.service';
import { MessageProducerService } from 'src/message.producer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MembershipController],
  providers: [MembershipService, DatabaseService, ConfigService],
})
export class MembershipModule {}
