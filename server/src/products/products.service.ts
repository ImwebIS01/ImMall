import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { object } from 'joi';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const code = await this.databaseService.genCode();
      const product = await this.databaseService.query(`
          INSERT INTO test2.product 
          (code,
            price,
            name,
            prodStatus,
            stock,
            image_url,
            description,
            site_code) 
          VALUES ('${code}',
          '${createProductDto.price}',
          '${createProductDto.name}',
          '${createProductDto.prodStatus}',
          '${createProductDto.stock}',
          '${createProductDto.image_url}',
          '${createProductDto.description}',
          '${createProductDto.site_code}')
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

  async findOne(code: string): Promise<GetProductDto> {
    try {
      const productData = await this.databaseService.query(`
      SELECT * FROM test2.product WHERE code='${code}'
      `);
      const product: GetProductDto = productData[0];
      return productData[0];
    } catch (error) {
      throw error;
    }
  }

  async findOrderInfo(code: string): Promise<GetProductDto> {
    try {
      const productdata = await this.databaseService.query(`
      SELECT *
        from product P
        inner join order_product OP
        on P.code = OP.fk_product_code
        inner join order O
        on OP.fk_order_code = O.code
      WHERE P.code = ${code}
      `);
      const product: GetProductDto = productdata[0];
      return productdata[0];
    } catch (error) {
      throw error;
    }
  }

  async update(code: string, updateProductDto: UpdateProductDto) {
    try {
      const productData = await this.databaseService.query(`
      SELECT * FROM test2.product WHERE code = '${code}'`);
      const product: GetProductDto = productData[0];
      const newProduct = await this.databaseService.query(`
    UPDATE test2.product 
    SET 
    price =  IF(${updateProductDto.price != undefined},'${
        updateProductDto.price
      }','${product.price}'),
    name =  IF(${updateProductDto.name != undefined},'${
        updateProductDto.name
      }','${product.name}'),
    prodStatus = IF(${updateProductDto.prodStatus != undefined},'${
        updateProductDto.prodStatus
      }','${product.prodStatus}'),
    stock = IF(${updateProductDto.stock != undefined},'${
        updateProductDto.stock
      }','${product.stock}'),
    image_url = IF(${updateProductDto.image_url != undefined},'${
        updateProductDto.image_url
      }','${product.image_url}'),
    description = IF(${updateProductDto.description != undefined},'${
        updateProductDto.description
      }','${product.description}'),
    site_code = IF(${updateProductDto.site_code != undefined},'${
        updateProductDto.site_code
      }','${product.site_code}')
    WHERE code='${code}';
    `);
      return newProduct[0];
    } catch (error) {
      throw error;
    }
  }

  async remove(code: string) {
    try {
      const product = await this.databaseService.query(`
    DELETE FROM test2.product WHERE code='${code}';`);
      await this.databaseService.commit();
      return product[0];
    } catch (error) {
      throw error;
    }
  }
}
