import {
  CACHE_MANAGER,
  Controller,
  Get,
  Header,
  Inject,
  Param,
  Post,
  Query,
  Req,
  Res,
  Response,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { MessageProducerService } from './message.producer.service';
import { MessageConsumer } from './message.consumer';
import { RedisService } from 'nestjs-redis';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  //API WELCOME PAGE
  @Get()
  getHello(): string {
    const apiDocs = `http://localhost:${process.env.PORT}/api-docs`;
    return `<div><H1>ImMall Backend API</H1></div>Welcome to visit the ImMall Backend API Home.<br>Please click <a href=${apiDocs}>here</a> want to see the api-docs.`;
  }

  @Get('test')
  async push(): Promise<boolean> {
    return true;
  }

  @Get('consume')
  pop(): boolean {
    return true;
  }
  @Get('/cache')
  async getCache(): Promise<string> {
    // const savedTime = await this.cacheManager.get<number>('time');
    // if (savedTime) {
    //   return 'saved time : ' + savedTime;
    // }
    // const now = new Date().getTime();
    // await this.cacheManager.set<number>('time', now);
    // return 'save new time : ' + now;
    console.log(await this.cacheManager.get<string>('immall'));

    return 'as';
  }

  @Post('')
  async setRedis(@Query() query) {
    const { key, value } = query;
    return this.cacheManager.set<string>(key, value);
  }
}
