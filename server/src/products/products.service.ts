import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { object } from 'joi';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  /** 상품 등록 서비스 */
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
            category,
            fk_site_code) 
          VALUES ('${code}',
          '${createProductDto.price}',
          '${createProductDto.name}',
          '${createProductDto.prodStatus}',
          '${createProductDto.stock}',
          '${createProductDto.image_url}',
          '${createProductDto.description}',
          '${createProductDto.category}',
          '${createProductDto.fk_site_code}')
          `);
      return product[0];
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    page: number,
    perPage: number,
    site_code: string
  ): Promise<GetProductDto[] | object> {
    const con = await this.databaseService.getConnection();
    try {
      const firstOne = (
        await con.query(`
    SELECT * FROM test2.product WHERE fk_site_code ='${site_code}' ORDER BY
    idx ASC
    LIMIT 1;;
    `)
      )[0];
      if (firstOne[0] === undefined) {
        return [];
      }
      const startIndex: number = perPage * (page - 1) + firstOne[0].idx;
      const productData: object = (
        await con.query(`
      SELECT
        *
        FROM test2.product
        WHERE
        idx >= ${startIndex} && fk_site_code="${site_code}"
        ORDER BY
        idx ASC
        LIMIT ${perPage};
        `)
      )[0];
      return productData;
    } catch (error) {
      throw error;
    }
  }

  async findAllCategory(
    page: number,
    perPage: number,
    site_code: string,
    category: string
  ): Promise<GetProductDto[] | object> {
    const con = await this.databaseService.getConnection();
    try {
      console.log(category);
      const firstOne = (
        await con.query(`
    SELECT * FROM test2.product WHERE fk_site_code ='${site_code}' && category='${category}' ORDER BY
    idx ASC
    LIMIT 1;;
    `)
      )[0];
      if (firstOne[0] === undefined) {
        return [];
      }
      const startIndex: number = perPage * (page - 1) + firstOne[0].idx;
      const productData: object = (
        await con.query(`
      SELECT
        *
        FROM test2.product
        WHERE
        idx >= ${startIndex} && fk_site_code="${site_code}" && category='${category}'
        ORDER BY
        idx ASC
        LIMIT ${perPage};
        `)
      )[0];
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
      category = IF(${updateProductDto.category != undefined},'${
        updateProductDto.category
      }','${product.category}'),
    site_code = IF(${updateProductDto.fk_site_code != undefined},'${
        updateProductDto.fk_site_code
      }','${product.fk_site_code}')
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
