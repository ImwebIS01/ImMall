import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly passwd: string;

  @ApiProperty()
  @IsString()
  readonly callnum: string;

  @ApiProperty()
  @IsDate()
  readonly created_time: Date;

  @ApiProperty()
  @IsDate()
  readonly updated_time: Date;

  @ApiProperty()
  @IsString()
  readonly fk_membership_code: string;

  @ApiProperty()
  @IsString()
  fk_site_code: string;
}
