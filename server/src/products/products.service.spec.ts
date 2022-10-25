import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';
import Pool from 'mysql2/typings/mysql/lib/Pool';
// interface MockResult {
//   idx: number;
//   code: string;
//   price: number;
//   name: string;
//   prodStatus: string;
//   stock: number;
//   image_url: string;
//   description: string;
//   category: string;
//   fk_site_code: string;
// }

// const returnResult: MockResult[] = [
//   {
//     idx: 1,
//     code: `test_code1`,
//     price: 100,
//     name: `test_name1`,
//     prodStatus: `test_prodStatus1`,
//     stock: 10,
//     image_url: `test_url1`,
//     description: `test_description1`,
//     category: `test_category1`,
//     fk_site_code: `test_site_code1`,
//   },
//   {
//     idx: 2,
//     code: `test_code2`,
//     price: 100,
//     name: `test_name2`,
//     prodStatus: `test_prodStatus2`,
//     stock: 10,
//     image_url: `test_url2`,
//     description: `test_description2`,
//     category: `test_category2`,
//     fk_site_code: `test_site_code2`,
//   },
// ];

// describe('ProductsService ()', () => {
//   let module: TestingModule;
//   let service: ProductsService;
//   let dbService: DatabaseService;
//   let pool: DeepMocked<Pool>;
//   let createProductDto: CreateProductDto = {
//     code: `test_code`,
//     price: 100,
//     name: `test_name$`,
//     prodStatus: `test_prodStatus$`,
//     stock: 10,
//     image_url: `test_url`,
//     description: `test_description`,
//     category: `test_category`,
//     fk_site_code: `test_site_code`,
//   };
//   /** mock-data */
//   const products = [];
//   for (let i = 0; i < 3; i++) {
//     products.push({
//       idx: i,
//       code: `test_code${i}`,
//       price: 100,
//       name: `test_name${i}`,
//       prodStatus: `test_prodStatus${i}`,
//       stock: 10,
//       image_url: `test_url${i}`,
//       description: `test_description${i}`,
//       fk_site_code: `test_site_code${i}`,
//     });
//   }
// beforeEach(async () => {
//   jest.mock('./products.service');
//   const module: TestingModule = await Test.createTestingModule({
//     imports: [DatabaseModule],
//     controllers: [ProductsController],
//     providers: [ProductsService, DatabaseService],
//   }).compile();

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should be defined', () => {
//     expect(dbService).toBeDefined();
//   });
// });
// // });
