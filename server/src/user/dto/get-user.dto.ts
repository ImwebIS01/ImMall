import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';

/* 유저의 모든 정보를 가져오는 DTO */
export class GetUserDto {
  @ApiProperty()
  @IsNumber()
  readonly idx: number;

  @ApiProperty()
  @IsNumber()
  readonly code: string;

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
  readonly createdTime: Date;

  @ApiProperty()
  @IsDate()
  readonly updatedTime: Date;

  @ApiProperty()
  @IsString()
  readonly siteCode: string;
}
