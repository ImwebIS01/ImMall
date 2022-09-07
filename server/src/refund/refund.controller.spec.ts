import { Test, TestingModule } from '@nestjs/testing';
import { RefundController } from './refund.controller';
import { RefundService } from './refund.service';

describe('RefundController', () => {
  let controller: RefundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefundController],
      providers: [RefundService],
    }).compile();

    controller = module.get<RefundController>(RefundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
