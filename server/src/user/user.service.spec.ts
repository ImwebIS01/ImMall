import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseService } from '../database/database.service';
import { UserModule } from './user.module';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { GetUserDto } from './dto/get-user.dto';
import { UserMockData } from 'src/mock-data';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';

describe('UserService', () => {
  let service: UserService;
  let dbService: DatabaseService;
  let users: GetUserDto[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, DatabaseModule],
      providers: [UserService, DatabaseService],
    }).compile();

    service = module.get<UserService>(UserService);
    dbService = module.get<DatabaseService>(DatabaseService);

    users = UserMockData;
    jest.spyOn(dbService, 'getConnection').mockReturnValue();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(dbService).toBeDefined();
  });
});
