import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.register(createOrderDto);
  }
  @Get('/')
  findAll() {
    return this.orderService.getAll();
  }
  @Get(':idx')
  findOne(@Param('idx') idx: string) {
    return this.orderService.getOne(+idx);
  }
  @Patch(':idx')
  update(@Param('idx') idx: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.setOne(+idx, updateOrderDto);
  }
  @Delete(':idx')
  remove(@Param('idx') idx: string) {
    return this.orderService.remove(+idx);
  }
}
