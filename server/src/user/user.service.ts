import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// input-output dto 모두 있어야 함

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { username, email, password }: CreateUserDto = createUserDto;
      const newUser = await this.databaseService.getConnection().query(`
      INSERT INTO user 
      (username, email, password) 
      VALUES ("${username}","${email}","${password}");
      `);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
    } catch (error) {}
    const users = await this.databaseService.getConnection().query(`
    SELECT * FROM user ORDER BY created_time DESC;
    `);
    return users[0];
  }

  async findOne(id: number) {
    try {
      const user = await this.databaseService.getConnection().query(`
      SELECT * 
      FROM user 
      WHERE id = ${id};`);
      return user[0][0];
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      const username = updateUserDto.username
        ? updateUserDto.username
        : user.username;
      const email = updateUserDto.email ? updateUserDto.email : user.email;
      const password = updateUserDto.password
        ? updateUserDto.password
        : user.password;

      await this.databaseService.getConnection().query(`
      UPDATE user
      SET
      username='${username}',
      email='${email}',
      password='${password}'

      WHERE id=${id};
      `);
      return this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.getConnection().query(`
      DELETE from user
      WHERE id=${id}
      `);
    } catch (error) {
      throw error;
    }
  }
}
