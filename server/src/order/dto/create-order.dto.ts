import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '주문 id',
  })
  readonly idx: number;

  @IsNotEmpty()
  @ApiProperty({
    description: '주문 코드',
  })
  readonly code: string;

  @IsNotEmpty()
  @ApiProperty({ description: '주문 번호' })
  readonly order_no: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: '데이터 수정 시간',
  })
  updated_time: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: '주문 시간',
  })
  created_time: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: '배송완료 시간',
  })
  readonly delivered_time: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: '주문한 사이트 코드 ',
  })
  readonly site_code: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '주문한 유저 코드 ',
  })
  readonly user_code: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '우편 코드 ',
  })
  readonly post_number: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '받는 고객 이름',
  })
  readonly receiver_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '받는 고객 주소',
  })
  readonly receiver_address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '받는 고객 전화번호',
  })
  readonly receiver_phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '받는 고객 비상 전화번호',
  })
  readonly receiver_phone2: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '주문 상태',
  })
  readonly status: string;

  @IsNumber()
  @ApiProperty({ description: '가격' })
  readonly total_price: number;
}
