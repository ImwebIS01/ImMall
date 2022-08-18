import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const { username, email, password }: CreateUserDto = createUserDto;
    return await this.databaseService.getConnection().query(`
    INSERT INTO user 
    (username, email, password) 
    VALUES ("${username}","${email}","${password}");
    `);
  }

  async findAll() {
    const users = await this.databaseService.query(`
    SELECT * FROM user ORDER BY created_time DESC;
    `);
    return users;
  }

  async findOne(id: number) {
    try {
      const user = await this.databaseService.query(`
          SELECT * 
          FROM user 
          WHERE id = ${id};`);
      return user[0][0];
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.databaseService.query(`
          SELECT * 
          FROM user 
          WHERE email = ${email};`);
      return user[0][0];
    } catch (error) {
      throw error;
    }
  }

  async update(user: User) {
    const { id, username, email, password }: User = user;
    await this.databaseService.beginTransaction();

    await this.databaseService.query(`
    UPDATE user
    SET
    username='${username}',
    email='${email}',
    password='${password}'
    WHERE id=${id};
    `);

    const updatedUser = await this.databaseService.query(`
    SELECT * FROM user WHERE id=${id}`);

    await this.databaseService.commit();

    return updatedUser;
  }

  async remove(id: number) {
    try {
      return await this.databaseService.query(`
          DELETE from user
          WHERE id=${id}
          `);
    } catch (error) {
      throw error;
    }
  }
}
