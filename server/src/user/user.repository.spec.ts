import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UserRepository, DatabaseService],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  it('모든 유저 가져오기', () => {
    expect(repository).toBeDefined();
  });
});
