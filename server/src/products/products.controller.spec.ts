import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseModule } from 'src/database/database.module';
describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  /** mock-data */
  let products = [];
  for (let i = 0; i < 3; i++) {
    products.push({
      idx: i,
      code: `test_code${i}`,
      price: 100,
      name: `test_name${i}`,
      prodStatus: `test_prodStatus${i}`,
      stock: 10,
      image_url: `test_url${i}`,
      description: `test_description${i}`,
      site_code: `test_site_code${i}`,
    });
  }
  console.log(products);

  beforeEach(async () => {
    jest.mock('./products.service');
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [ProductsController],
      providers: [ProductsService, DatabaseService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);

    /** 서비스 로직 구현부 모킹 함수입니다. */

    /** 전체 조회 */
    jest.spyOn(service, 'findAll').mockResolvedValue(products);

    /** 단일 조회 */
    jest.spyOn(service, 'findOne').mockImplementation((code: string) => {
      let result;
      products.forEach((element) => {
        if (element.code === code) {
          result = element;
        }
      });
      return result;
    });

    /** 상품 추가 */
    jest
      .spyOn(service, 'create')
      .mockImplementation(async (createMembershipDto: CreateProductDto) => {
        try {
          products.push({
            idx: 4,
            code: `test_code4`,
            price: 100,
            name: `test_name4`,
            prodStatus: `test_prodStatus4`,
            stock: 10,
            image_url: `test_url4`,
            description: `test_description4`,
            site_code: `test_site_code4`,
          });
          if (products[3]) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          throw error;
        }
      });

    /** 상품 수정 */
    jest
      .spyOn(service, 'update')
      .mockImplementation(
        async (code: string, updateProductDto: UpdateProductDto) => {
          try {
            for (let i in products) {
              if (products[i].code === code) {
                products[i].price = updateProductDto.price
                  ? updateProductDto.price
                  : products[i].price;
                products[i].name = updateProductDto.name
                  ? updateProductDto.name
                  : products[i].name;
                products[i].prodStatus = updateProductDto.prodStatus
                  ? updateProductDto.prodStatus
                  : products[i].prodStatus;
                products[i].stock = updateProductDto.stock
                  ? updateProductDto.stock
                  : products[i].stock;
                products[i].image_url = updateProductDto.image_url
                  ? updateProductDto.image_url
                  : products[i].image_url;
                products[i].description = updateProductDto.description
                  ? updateProductDto.description
                  : products[i].description;
                products[i].site_code = updateProductDto.site_code
                  ? updateProductDto.site_code
                  : products[i].site_code;
                break;
              }
            }
            return true;
          } catch (error) {
            throw error;
          }
        }
      );

    /** 상품 삭제 */
    jest.spyOn(service, 'remove').mockImplementation(async (code) => {
      products = products.filter((v) => v.code !== code);
      return true;
    });
  });

  it('상품 컨트롤러 정의', () => {
    expect(controller).toBeDefined();
  });

  it('상품 서비스 정의', () => {
    expect(service).toBeDefined();
  });

  describe('상품 전체 조회', () => {
    it('단일 상품 항목이 조회되어야 함', async () => {
      expect(await controller.findAll()).toBe(products);
    });
  });

  describe('상품 단일 조회', () => {
    it('단일 상품 항목이 조회되어야 함', async () => {
      expect(await controller.findOne('test_code2')).toBe(products[2]);
    });
  });

  describe('상품 추가', () => {
    it('상품 항목이 추가되어야 함', async () => {
      expect(
        await controller.create({
          code: `test_code4`,
          price: 100,
          name: `test_name4`,
          prodStatus: `test_prodStatus4`,
          stock: 10,
          image_url: `test_url4`,
          description: `test_description4`,
          site_code: `test_site_code4`,
        })
      ).toBe(true);
    });
  });

  describe('상품 수정', () => {
    it('상품 항목이 삭제되어야 함', async () => {
      expect(
        await controller.update(`test_code4`, {
          price: 100,
          name: `test_name4`,
          prodStatus: `test_prodStatus4`,
          stock: 10,
          image_url: `test_url4`,
          description: `test_description4`,
          site_code: `test_site_code4`,
        })
      ).toBe(true);
    });
  });

  describe('상품 삭제', () => {
    it('상품 항목이 삭제되어야 함', async () => {
      expect(await controller.remove(`test code5`)).toBe(true);
    });
  });
});
