import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { object } from 'joi';
import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  /** 상품 등록 */
  async create(createProductDto: CreateProductDto): Promise<boolean> {
    try {
      const [con, code] = await Promise.all([
        this.databaseService.getConnection(),
        this.databaseService.genCode(),
      ]);
      await con.query(`
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
      con.release();
      return true;
    } catch (error) {
      throw error;
    }
  }

  /** 전체조회 */
  async findAll(
    perPage: number,
    code: string,
    site_code: string
  ): Promise<GetProductDto[]> {
    console.log(code);
    const con = await this.databaseService.getConnection();
    try {
      const [row] = await con.query(`
    SELECT idx FROM test2.product WHERE code = '${code}' &&fk_site_code ='${site_code}'
    `);
      const cursorIdx = row[0].idx;
      const [productData] = await con.query(`
      SELECT
        *
        FROM test2.product
        WHERE
        idx >= '${cursorIdx}' AND fk_site_code='${site_code}'
        LIMIT ${perPage};
        `);
      console.log(productData);
      console.log(productData[0]);
      const products: GetProductDto[] = [];
      for (const i in productData) {
        products.push(productData[i]);
      }
      console.log(products);
      con.release();
      return products;
    } catch (error) {
      throw error;
    }
  }

  /** 가격순 전체조회 */
  async findAllPrice(
    perPage: number,
    code: string,
    site_code: string
  ): Promise<GetProductDto[]> {
    const con = await this.databaseService.getConnection();
    try {
      const [row] = await con.query(`
    SELECT idx, price FROM test2.product WHERE code = '${code}' &&fk_site_code ='${site_code}';
    `);
      const cursorIdx = row[0].idx;
      const cursorPrice = row[0].price;
      const [productData] = await con.query(`
      SELECT
        *
        FROM test2.product
        WHERE
        (price >= '${cursorPrice}'AND fk_site_code='${site_code}')
          OR
        (price = '${cursorPrice}' AND idx > '${cursorIdx}'AND fk_site_code='${site_code}')
        ORDER BY price ASC, idx ASC   
        LIMIT ${perPage};
        `);
      console.log(productData);
      const products: GetProductDto[] = [];
      for (const i in productData) {
        products.push(productData[i]);
      }
      con.release();
      return products;
    } catch (error) {
      throw error;
    }
  }

  /** 카테고리별 조회*/
  async findAllCategory(
    perPage: number,
    code: string,
    site_code: string,
    category: string
  ): Promise<GetProductDto[]> {
    const con = await this.databaseService.getConnection();
    try {
      const [row] = await con.query(`
        SELECT idx FROM test2.product WHERE code = '${code}' && fk_site_code ='${site_code}' && category='${category}';
    `);
      const cursorIdx = row[0].idx;
      const [productData] = await con.query(` 
      SELECT
        *
        FROM test2.product
        WHERE
        idx >= ${cursorIdx} && fk_site_code="${site_code}" && category='${category}'
        LIMIT ${perPage};
        `);
      con.release();
      const products: GetProductDto[] = [];
      for (const i in productData) {
        products.push(productData[i]);
      }
      return products;
    } catch (error) {
      throw error;
    }
  }

  /** 카테고리별 조회(가격순)*/
  async findAllCategoryPrice(
    perPage: number,
    code: string,
    site_code: string,
    category: string
  ): Promise<GetProductDto[]> {
    const con = await this.databaseService.getConnection();
    try {
      const [row] = await con.query(`
        SELECT idx, price FROM test2.product WHERE code = '${code}' && fk_site_code ='${site_code}' && category='${category}';
    `);
      const cursorIdx = row[0].idx;
      const cursorPrice = row[0].price;
      const [productData] = await con.query(` 
      SELECT
        *
        FROM test2.product
        WHERE
        (price >= '${cursorPrice}' && fk_site_code="${site_code}" && category='${category}')
        OR
        (price = '${cursorPrice}' AND idx > '${cursorIdx}' AND fk_site_code='${site_code}'&& category='${category}')
        ORDER BY price ASC, idx ASC 
        LIMIT ${perPage};
        `);
      con.release();
      const products: GetProductDto[] = [];
      for (const i in productData) {
        products.push(productData[i]);
      }
      return products;
    } catch (error) {
      throw error;
    }
  }

  /** code로 조회 */
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

  /** Order정보 조회 */
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

  /** 상품정보 업데이트 */
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

  /** 상품 삭제 */
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
