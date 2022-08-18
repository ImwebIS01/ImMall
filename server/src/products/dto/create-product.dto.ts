import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: '고유 id' })
  readonly id: number;

  @ApiProperty({ description: '상품명' })
  readonly productname: string;

  @ApiProperty({ description: '가격' })
  readonly price: number;

  @ApiProperty({ description: '상품정보' })
  readonly info: string;
}
