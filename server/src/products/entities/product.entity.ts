import { ApiProperty } from '@nestjs/swagger';

interface ProductInterface {
  readonly id: number;
  readonly no: number;
  readonly siteCode: string;
  readonly code: string;
  readonly prodStatus: string;
  readonly prodCode: string;
  readonly name: string;
  readonly price: number;
  readonly content: string;
  readonly simpleContent: string;
  readonly imgUrl: string;
}

export class Product implements ProductInterface {
  readonly id: number;
  readonly no: number;
  readonly siteCode: string;
  readonly code: string;
  readonly prodStatus: string;
  readonly prodCode: string;
  readonly name: string;
  readonly price: number;
  readonly content: string;
  readonly simpleContent: string;
  readonly imgUrl: string;

  constructor(
    id: number,
    no: number,
    siteCode: string,
    code: string,
    prodStatus: string,
    prodCode: string,
    name: string,
    price: number,
    content: string,
    simpleContent: string,
    imgUrl: string
  ) {
    this.id = id;
    this.no = no;
    this.siteCode = siteCode;
    this.code = code;
    this.prodStatus = prodStatus;
    this.prodCode = prodCode;
    this.name = name;
    this.price = price;
    this.content = content;
    this.simpleContent = simpleContent;
    this.imgUrl = imgUrl;
  }
}
