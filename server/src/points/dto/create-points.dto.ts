import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePointsDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '포인트 id',
  })
  readonly idx: number;

  @IsNotEmpty()
  @ApiProperty({
    description: '포인트 코드',
  })
  readonly code: string;
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: '포인트 생성 시간',
  })
  readonly created_time: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '포인트 수',
  })
  readonly point: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: '포인트 만료 시간',
  })
  readonly expire_date: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '유저 코드 외래키',
  })
  readonly fk_user_code: string;
}
