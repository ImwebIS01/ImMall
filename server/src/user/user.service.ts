import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService
  ){}
  
  async create(createUserDto: CreateUserDto) {

    try {
      const { username, email, password }: CreateUserDto = createUserDto;
      const newUser = await this.databaseService.getConnection().query(`
      INSERT INTO test.user 
      (username, email, password) 
      VALUES ("${username}","${email}","${password}");
      `);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return this.databaseService.getConnection().query(`
    SELECT * FROM test.user ORDER BY create_time DESC;

    `)
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
