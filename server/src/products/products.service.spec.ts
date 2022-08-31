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
describe('ProductsService ()', () => {
  let productService: ProductsService;
  let productController: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [ProductsController],
      providers: [ProductsService, DatabaseService],
    }).compile();

    productController = module.get<ProductsController>(ProductsController);
    productService = module.get<ProductsService>(ProductsService);
  });

  // describe('createProduct', () => {
  //   it('상품을 생성하고, 생성한 상품을 반환한다', async () => {
  //     const code = 'abc';
  //     const price = 100;
  //     const name = '재홍';
  //     const prodStatus = 'selling';
  //     const stock = 10;
  //     const image_url = 'www.asd.com';
  //     const description = 'qwer';
  //     const site_code = 'code1';
  //     const CreateDto = new CreateProductDto();
  //     CreateDto.code = code;
  //     CreateDto.price = price;
  //     CreateDto.name = name;
  //     CreateDto.prodStatus = prodStatus;
  //     CreateDto.stock = stock;
  //     CreateDto.image_url = image_url;
  //     CreateDto.description = description;
  //     CreateDto.site_code = site_code;
  //     const createdProductEntity = CreateDto.toEntity();
  //     const savedProduct = GetProductDto.of({
  //       idx: 1,
  //       code: code,
  //       price: price,
  //       name: name,
  //       prodStatus: prodStatus,
  //       stock: stock,
  //       image_url: image_url,
  //       description: description,
  //       site_code: site_code,
  //     });
  //     const productServiceSaveSpy = jest
  //       .spyOn(productService, 'create')
  //       .mockResolvedValue(savedProduct);

  //     const result = await productService.create(CreateDto);

  //     expect(productServiceSaveSpy).toBeCalledWith(createdProductEntity);
  //     expect(result).toBe(savedProduct);
  //   });
  // });

  // describe('findProduct', () => {
  //   it('상품 전체 조회', async () => {
  //     const existingUserList = [
  //       GetProductDto.of({
  //         idx: 100,
  //         code: 'abc',
  //         price: 100,
  //         name: '재홍',
  //         prodStatus: 'selling',
  //         stock: 10,
  //         image_url: 'www.asd.com',
  //         description: 'qwer',
  //         site_code: 'code1',
  //       }),
  //     ];
  //     const productRepositoryFindSpy = jest
  //       .spyOn(productService, 'findAll')
  //       .mockResolvedValue(existingUserList);
  //     const result = await productService.findAll();
  //     expect(productRepositoryFindSpy).toBeCalled();
  //     expect(result).toStrictEqual(existingUserList);
  //   });

  //   describe('findById', () => {
  //     it('생성되지 않은 상품의 idx가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', async () => {
  //       const productId = 1;
  //       jest.spyOn(productService, 'findOne').mockResolvedValue(undefined);

  //       const result = async () => {
  //         await productService.findOne(productId);
  //       };

  //       await expect(result).rejects.toThrowError(
  //         new NotFoundException('유저 정보를 찾을 수 없습니다.')
  //       );
  //     });
  //   });
  // });
  test('1 is 1', () => {
    expect(1).toBe(1);
  });

  function getUser(id) {
    return {
      id,
      email: `user${id}@test.com`,
    };
  }

  test('return a user object', () => {
    expect(getUser(1)).toBe({
      id: 1,
      email: `user1@test.com`,
    });
  });

  test('return a user object', () => {
    expect(getUser(1)).toEqual({
      id: 1,
      email: `user1@test.com`,
    });
  });

  test('array', () => {
    const colors = ['Red', 'Yellow', 'Blue'];
    expect(colors).toHaveLength(3);
    expect(colors).toContain('Yellow');
    expect(colors).not.toContain('Green');
  });
});
