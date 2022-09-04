import { CreateOrderDto } from './create-order.dto';
import { PartialType } from '@nestjs/swagger';

export class GetOrderDto extends PartialType(CreateOrderDto) {}
