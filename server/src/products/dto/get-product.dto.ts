import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetProductDto {
  @IsNumber()
  @IsNotEmpty()
  readonly idx: number;

  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly prodStatus: string;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsString()
  @IsNotEmpty()
  readonly image_url: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  fk_site_code: string;

  // static of(params: Partial<GetProductDto>): GetProductDto {
  //   const product = new GetProductDto();
  //   Object.assign(product, params);

  //   return product;
  // }
  // static create(
  //   code: string,
  //   price: number,
  //   name: string,
  //   prodStatus: string,
  //   stock: number,
  //   image_url: string,
  //   description: string,
  //   site_code: string
  // ) {
  //   const product = new GetProductDto();
  //   product.code = code;
  //   product.price = price;
  //   product.name = name;
  //   product.prodStatus = prodStatus;
  //   product.stock = stock;
  //   product.image_url = image_url;
  //   product.description = description;
  //   product.site_code = site_code;
  //   return product;
  // }
}
