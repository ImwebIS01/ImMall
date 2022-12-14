import {
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  /**
   * api 문서로 연결되는 페이지입니다.
   * @returns apidocs
   */
  @Get()
  getApiDocs(): string {
    const apiDocs = `http://localhost:${process.env.PORT}/api-docs`;
    return `<div><H1>ImMall Backend API</H1></div>Welcome to visit the ImMall Backend API Home.<br>Please click <a href=${apiDocs}>here</a> want to see the api-docs.`;
  }
}
