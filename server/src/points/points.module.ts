import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PointsController],
  providers: [PointsService, DatabaseService],
})
export class PointsModule {}
