import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const {
        no,
        siteCode,
        code,
        prodStatus,
        prodCode,
        name,
        price,
        content,
        simpleContent,
        imgUrl,
      }: CreateProductDto = createProductDto;

      const product = await this.databaseService.query(`
          INSERT INTO test2.product 
          (no,
            siteCode,
            code,
            prodStatus,
            prodCode,
            name,
            price,
            content,
            simpleContent,
            imgUrl) 
          VALUES ('${no}',
          '${siteCode}',
          '${code}',
          '${prodStatus}',
          '${prodCode}',
          '${name}',
          '${price}',
          '${content}',
          '${simpleContent}',
          '${imgUrl}');
          `);
      return product[0];
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const productData: object = await this.databaseService.query(`
    SELECT * FROM test2.product;
    `);
      return productData;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const productdata = await this.databaseService.query(`
      SELECT * FROM test2.product WHERE id = ${id}`);
      const product: Product = productdata[0];
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    try {
      const product: Product = await this.findOne(id);
      const no = updateProductDto.no ? updateProductDto.no : product.no;
      const siteCode = updateProductDto.siteCode
        ? updateProductDto.siteCode
        : product.siteCode;
      const code = updateProductDto.code ? updateProductDto.code : product.code;
      const prodStatus = updateProductDto.prodStatus
        ? updateProductDto.prodStatus
        : product.prodStatus;
      const prodCode = updateProductDto.prodCode
        ? updateProductDto.prodCode
        : product.prodCode;
      const name = updateProductDto.name ? updateProductDto.name : product.name;
      const price = updateProductDto.price
        ? updateProductDto.price
        : product.price;
      const content = updateProductDto.content
        ? updateProductDto.content
        : product.content;
      const simpleContent = updateProductDto.simpleContent
        ? updateProductDto.simpleContent
        : product.simpleContent;
      const imgUrl = updateProductDto.imgUrl
        ? updateProductDto.imgUrl
        : product.imgUrl;

      const newProduct = await this.databaseService.query(`
    UPDATE test2.product 
    SET 
    no = '${no}',
    siteCode =  '${siteCode}',
    code =  '${code}',
    prodStatus = '${prodStatus}',
    prodCode = '${prodCode}',
    name = '${name}',
    price = '${price}',
    content = '${content}',
    simpleContent = '${simpleContent}',
    imgUrl = '${imgUrl}'
    WHERE id=${id};
    `);
      return newProduct[0];
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<Product> {
    try {
      const product = await this.databaseService.query(`
    DELETE FROM test2.product WHERE id=${id};`);
      await this.databaseService.commit();
      return product[0];
    } catch (error) {
      throw error;
    }
  }
}
