import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  // describe('findAll', () => {
  //   it('should return an array of cats', async () => {
  //     const result = ['test'];
  //     jest.spyOn(service, 'findAll').mockImplementation(() => result);

  //     expect(await controller.findAll()).toBe(result);
  //   });
  // }
});
