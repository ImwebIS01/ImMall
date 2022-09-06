import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UsefulService } from 'src/useful/useful.service';

@Module({
  imports: [ConfigModule],
  providers: [UsefulService, ConfigService, UsefulService],
  exports: [UsefulModule],
})
export class UsefulModule {}
