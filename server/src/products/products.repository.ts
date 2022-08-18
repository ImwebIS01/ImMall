import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createProductDto: CreateProductDto) {
    const { productname, price, info }: CreateProductDto = createProductDto;
    return await this.databaseService.getConnection().query(`
          INSERT INTO test2.product 
          (productname, price, info) 
          VALUES ("${productname}","${price}","${info}");
          `);
  }

  async findAll() {
    return await this.databaseService.getConnection().query(`
    SELECT * FROM test2.product;
    `);
  }

  async findOne(id: number) {
    const product = await this.databaseService.getConnection().query(`
      SELECT * FROM test2.product WHERE id = ${id}`);
    return product[0][0];
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { productname, price, info }: UpdateProductDto = updateProductDto;
    return await this.databaseService.getConnection().query(`
    UPDATE test2.product 
    SET productname ='${productname}',
        price = '${price}',
        info = '${info}'
        WHERE id =${id};
    `);
  }

  async remove(id: number) {
    return await this.databaseService.getConnection().query(`
    DELETE FROM test2.product WHERE id=${id};`);
  }
}
