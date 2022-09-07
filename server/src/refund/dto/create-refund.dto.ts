import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GetRefundDto } from './get-refund.dto';
export class CreateRefundDto extends PickType(PartialType(GetRefundDto), [
  'code',
  'amount',
  'reason_type',
  'reason_detail',
  'fk_order_code',
  'fk_site_code',
]) {}
