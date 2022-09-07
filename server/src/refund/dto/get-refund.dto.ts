import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetRefundDto {
  @IsNumber()
  @IsNotEmpty()
  readonly idx: number;

  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  readonly reason_type: string;

  @IsString()
  @IsNotEmpty()
  readonly reason_detail: string;

  @IsString()
  @IsNotEmpty()
  readonly fk_order_code: string;

  @IsString()
  @IsNotEmpty()
  fk_site_code: string;
}
