import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { MasterDatabaseService } from 'src/database/master.database.service';
import { SlaveDatabaseService } from 'src/database/slave.database.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    DatabaseModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  controllers: [SiteController],
  providers: [
    SiteService,
    DatabaseService,
    MasterDatabaseService,
    SlaveDatabaseService,
  ],
})
export class SiteModule {}
