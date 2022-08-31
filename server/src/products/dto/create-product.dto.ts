import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GetProductDto } from './get-product.dto';
export class CreateProductDto extends PickType(PartialType(GetProductDto), [
  'code',
  'price',
  'name',
  'prodStatus',
  'stock',
  'image_url',
  'description',
  'site_code',
]) {
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
  readonly site_code: string;
}

// toEntity(): GetProductDto {
//   return GetProductDto.create(
//     this.code,
//     this.price,
//     this.name,
//     this.prodStatus,
//     this.stock,
//     this.image_url,
//     this.description,
//     this.site_code
//   );
// }
