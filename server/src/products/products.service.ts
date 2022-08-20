import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepository.create(createProductDto);
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

  async findOne(id: number): Promise<Product> {
    try {
      return this.productRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    try {
      const product: Product = await this.productRepository.findOne(id);
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

      const newProduct: Product = new Product(
        id,
        no,
        siteCode,
        code,
        prodStatus,
        prodCode,
        name,
        price,
        content,
        simpleContent,
        imgUrl
      );
      return await this.productRepository.update(id, newProduct);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<Product> {
    try {
      return await this.productRepository.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
