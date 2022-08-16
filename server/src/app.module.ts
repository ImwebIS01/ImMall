import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
