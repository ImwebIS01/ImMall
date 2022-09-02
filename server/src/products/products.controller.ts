import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductDto } from './dto/get-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /** 상품등록 컨트롤러 */
  @Post(':site_code')
  async create(
    @Param('site_code') site_code: string,
    @Body() createProductDto: CreateProductDto
  ) {
    createProductDto.fk_site_code = site_code;
    return this.productsService.create(createProductDto);
  }

  // /** 상품등록 컨트롤러 */
  // @Get()
  // async findAll(@Query() query): Promise<GetProductDto[] | object> {
  //   const { page, perPage } = query;
  //   return this.productsService.findAll(+page, +perPage);
  // }

  @Get(':site_code')
  async getAllBySite(
    @Param('site_code') site_code: string,
    @Query() query
  ): Promise<GetProductDto[] | object> {
    const { page, perPage } = query;
    return this.productsService.findAll(+page, +perPage, site_code);
  }
  @Get('category/:site_code')
  async getAllByCategory(
    @Param('site_code') site_code: string,
    @Query() query
  ): Promise<GetProductDto[] | object> {
    const { page, perPage, category } = query;
    console.log(category);
    return this.productsService.findAllCategory(
      +page,
      +perPage,
      site_code,
      category
    );
  }

  @Get('code/:code')
  async findOne(@Param('code') code: string) {
    return this.productsService.findOne(code);
  }

  @Get('orderInfo/:code')
  async findOrderInfo(@Param('code') code: string) {
    return this.productsService.findOrderInfo(code);
  }

  @Patch(':code')
  async update(
    @Param('code') code: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(code, updateProductDto);
  }

  @Delete(':code')
  async remove(@Param('code') code: string) {
    return this.productsService.remove(code);
  }
}
