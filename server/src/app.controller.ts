import {
  Controller,
  Get,
  Header,
  Param,
  Req,
  Res,
  Response,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { MessageProducerService } from './message.producer.service';
import { MessageConsumer } from './message.consumer';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly messageProducerService: MessageProducerService,
    private readonly messageConsumer: MessageConsumer
  ) {}

  //API WELCOME PAGE
  @Get()
  getHello(): string {
    const apiDocs = `http://localhost:${process.env.PORT}/api-docs`;
    return `<div><H1>ImMall Backend API</H1></div>Welcome to visit the ImMall Backend API Home.<br>Please click <a href=${apiDocs}>here</a> want to see the api-docs.`;
  }

  @Get('test')
  push(): boolean {
    this.messageProducerService.sendMessage('msg');
    return true;
  }

  @Get('consume')
  pop(): boolean {
    return true;
  }
}
