import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { MasterDatabaseService } from './master.database.service';
import { SlaveDatabaseService } from './slave.database.service';

@Module({
  imports: [ConfigModule],
  providers: [
    DatabaseService,
    ConfigService,
    MasterDatabaseService,
    SlaveDatabaseService,
  ],
  exports: [DatabaseModule],
})
export class DatabaseModule {}
