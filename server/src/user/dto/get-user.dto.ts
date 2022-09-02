import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/* 유저의 모든 정보를 가져오는 DTO */
export class GetUserDto {
  @ApiProperty()
  @IsNumber()
  idx: number;

  @ApiProperty()
  @IsNumber()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  passwd: string;

  @ApiProperty()
  @IsString()
  callnum: string;

  @ApiProperty()
  @IsDate()
  created_time: Date;

  @ApiProperty()
  @IsDate()
  updated_time: Date;

  @ApiProperty()
  @IsString()
  fk_membership_code: string;

  @ApiProperty()
  @IsString()
  fk_site_code: string;
}
