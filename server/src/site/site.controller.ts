import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Controller('sites')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  create(@Body() createSiteDto: CreateSiteDto) {
    return this.siteService.create(createSiteDto);
  }

  @Get()
  findAll() {
    return this.siteService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.siteService.findOne(code);
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateSiteDto: UpdateSiteDto) {
    return this.siteService.update(code, updateSiteDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.siteService.remove(code);
  }
}
