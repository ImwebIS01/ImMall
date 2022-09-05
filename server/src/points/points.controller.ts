import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePointsDto } from './dto/create-points.dto';
@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get('/')
  findUserAllPoint(@Query('userCode') userCode: string) {
    return this.pointsService.findUserAllPoint(userCode);
  }
  @Get('/')
  findAll() {
    return this.pointsService.findAll();
  }
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.pointsService.findOne(code);
  }
}
