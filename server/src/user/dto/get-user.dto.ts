import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty()
  @IsNumber()
  readonly idx: number;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly passwd: string;

  @ApiProperty()
  @IsString()
  readonly callNum: string;

  @ApiProperty()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty()
  @IsDate()
  readonly updatedAt: Date;
}
