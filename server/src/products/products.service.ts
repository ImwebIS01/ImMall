import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { object } from 'joi';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createProductDto: CreateProductDto) {
    try {
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
          VALUES ('${createProductDto.no}',
          '${createProductDto.siteCode}',
          '${createProductDto.code}',
          '${createProductDto.prodStatus}',
          '${createProductDto.prodCode}',
          '${createProductDto.name}',
          '${createProductDto.price}',
          '${createProductDto.content}',
          '${createProductDto.simpleContent}',
          '${createProductDto.imgUrl}');
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

  async findOne(id: number): Promise<GetProductDto> {
    try {
      const productdata = await this.databaseService.query(`
      SELECT * FROM test2.product WHERE id = ${id}`);
      const product: GetProductDto = productdata[0];
      return productdata[0];
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<GetProductDto> {
    try {
      const productData = await this.databaseService.query(`
      SELECT * FROM test2.product WHERE id = ${id}`);
      const product: GetProductDto = productData[0];
      const newProduct = await this.databaseService.query(`
    UPDATE test2.product 
    SET 
    no = IF(${updateProductDto.no != undefined},'${updateProductDto.no}','${
        product.no
      }'),
    siteCode =  IF(${updateProductDto.siteCode != undefined},'${
        updateProductDto.siteCode
      }','${product.siteCode}'),
    code =  IF(${updateProductDto.code != undefined},'${
        updateProductDto.code
      }','${product.code}'),
    prodStatus = IF(${updateProductDto.prodStatus != undefined},'${
        updateProductDto.prodStatus
      }','${product.prodStatus}'),
    prodCode = IF(${updateProductDto.prodCode != undefined},'${
        updateProductDto.prodCode
      }','${product.prodCode}'),
    name = IF(${updateProductDto.name != undefined},'${
        updateProductDto.name
      }','${product.name}'),
    price = IF(${updateProductDto.price != undefined},'${
        updateProductDto.price
      }','${product.price}'),
    content = IF(${updateProductDto.content != undefined},'${
        updateProductDto.content
      }','${product.content}'),
    simpleContent = IF(${updateProductDto.simpleContent != undefined},'${
        updateProductDto.simpleContent
      }','${product.simpleContent}'),
    imgUrl = IF(${updateProductDto.imgUrl != undefined},'${
        updateProductDto.imgUrl
      }','${product.imgUrl}')
    WHERE id=${id};
    `);
      return newProduct[0];
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<GetProductDto> {
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
