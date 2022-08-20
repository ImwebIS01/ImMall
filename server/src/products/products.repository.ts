import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductRepository {
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

      await this.databaseService.beginTransaction();
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
      await this.databaseService.commit();
      return product[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    try {
      await this.databaseService.beginTransaction();
      const productData: object = await this.databaseService.query(`
    SELECT * FROM test2.product;
    `);
      await this.databaseService.commit();
      return productData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      await this.databaseService.beginTransaction();
      const productdata = await this.databaseService.query(`
      SELECT * FROM test2.product WHERE id = ${id}`);
      await this.databaseService.commit();
      const product: Product = productdata[0];
      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
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
      }: UpdateProductDto = updateProductDto;
      await this.databaseService.beginTransaction();
      const product = await this.databaseService.query(`
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
      await this.databaseService.commit();
      return product[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async remove(id: number): Promise<Product> {
    try {
      await this.databaseService.beginTransaction();
      const product = await this.databaseService.query(`
    DELETE FROM test2.product WHERE id=${id};`);
      await this.databaseService.commit();
      return product[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
