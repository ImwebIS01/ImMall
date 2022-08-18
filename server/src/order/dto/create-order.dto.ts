import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '주문 id',
  })
  readonly id: number;

  @IsNotEmpty()
  @ApiProperty({
    description: '주문 코드',
  })
  readonly code: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '주문한 사이트 코드 ',
  })
  readonly siteCode: string;

  @IsNotEmpty()
  @ApiProperty({ description: '주문 번호' })
  readonly orderNumber: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '주문한 고객 이메일' })
  readonly ordererEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '주문한 고객 이름',
  })
  readonly ordererName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '주문한 고객 전화번호',
  })
  readonly ordererCall: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '주문한 고객 비상 전화번호',
  })
  readonly ordererCall2: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: '주문 시간',
  })
  readonly orderTime: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: '주문 완료 시간',
  })
  readonly completeTime: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '주문 갯수',
  })
  readonly count: number;
  @IsNumber()
  @ApiProperty({ description: '가격' })
  readonly price: number;
}
