import { ApiProperty } from '@nestjs/swagger';

interface ProductInterface {
  readonly id: number;
  readonly productname: string;
  readonly price: number;
  readonly info: string;
}

export class Product implements ProductInterface {
  readonly id: number;
  readonly productname: string;
  readonly price: number;
  readonly info: string;

  constructor(id: number, productname: string, price: number, info: string) {
    this.id = id;
    this.productname = productname;
    this.price = price;
    this.info = info;
  }
}
