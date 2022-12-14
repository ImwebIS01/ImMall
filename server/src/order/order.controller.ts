import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':site_code')
  create(
    @Param('site_code') site_code: string,
    @Query('productCode') productCode: string,
    @Query('count') count: number,
    @Body() createOrderDto: CreateOrderDto
  ) {
    createOrderDto.fk_site_code = site_code;
    return this.orderService.create(productCode, count, createOrderDto);
  }
  @Get('/')
  findAll() {
    return this.orderService.findAll();
  }
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.orderService.findOne(code);
  }
  @Patch(':code')
  update(@Param('code') code: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(code, updateOrderDto);
  }
  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.orderService.remove(code);
  }
}
