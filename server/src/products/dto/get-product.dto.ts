import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetProductDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly no: number;

  @IsString()
  @IsNotEmpty()
  readonly siteCode: string;

  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  readonly prodStatus: string;

  @IsString()
  @IsNotEmpty()
  readonly prodCode: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  readonly simpleContent: string;

  @IsString()
  @IsNotEmpty()
  readonly imgUrl: string;
}
