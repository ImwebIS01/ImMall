import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseModule],
})
export class DatabaseModule {
  constructor(private readonly databaseService: DatabaseService) {}
}
