import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto) {
    try {
      await this.productRepository.create(createProductDto);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return this.productRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return this.productRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product: Product = await this.productRepository.findOne(id);
      const productname = updateProductDto.productname
        ? updateProductDto.productname
        : product.productname;
      const price = updateProductDto.price
        ? updateProductDto.price
        : product.price;
      const info = updateProductDto.info ? updateProductDto.info : product.info;

      const newProduct: Product = new Product(id, productname, price, info);
      return await this.productRepository.update(id, newProduct);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.productRepository.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
