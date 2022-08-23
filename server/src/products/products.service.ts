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
      const productData = await this.databaseService.query(`
      SELECT * FROM test2.product WHERE id = ${id}`);
      const product: Product = productData[0];
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
