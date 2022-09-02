import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { MembershipService } from './membership.service';

describe('MembershipService', () => {
  let service: MembershipService;
  let dbService: DatabaseService;
  let memberships;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],

      providers: [MembershipService, DatabaseService],
    }).compile();

    service = module.get<MembershipService>(MembershipService);
    dbService = module.get<DatabaseService>(DatabaseService);

    memberships = [
      {
        idx: 1,
        code: 'test_code_number1',
        level: 1,
        point_rage: 1,
      },
      {
        idx: 2,
        code: 'test_code_number2',
        level: 2,
        point_rage: 2,
      },
      {
        idx: 3,
        code: 'test_code_number3',
        level: 3,
        point_rage: 3,
      },
    ];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(dbService).toBeDefined();
  });
});
