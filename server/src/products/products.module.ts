import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';
import { UsefulService } from 'src/useful/useful.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService, DatabaseService, ConfigService, UsefulService],
})
export class ProductsModule {}
