import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const code = await this.databaseService.genCode();
      const { name, email, passwd, callNum } = createUserDto;
      await this.databaseService.beginTransaction();
      await this.databaseService.query(`
      INSERT INTO user 
      (code, name, email, passwd, callNum) 
      VALUES ("${code}","${name}","${email}", "${passwd}", "${callNum}");
      `);
      const data = await this.databaseService.query(`
      SELECT * FROM user WHERE code="${code}";
      `);

      await this.databaseService.commit();
      const user: User = data[0];
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const usersData: object = await this.databaseService.query(`
      SELECT * FROM user;
      `);
      const users: any = usersData;
      console.log(users);
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(idx: number): Promise<User> {
    try {
      const userData = await this.databaseService.query(`
          SELECT * 
          FROM user 
          WHERE idx = ${idx};`);
      const user: User = userData[0];
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const userData = await this.databaseService.query(`
          SELECT * 
          FROM user 
          WHERE email = '${email}';`);
      console.log(userData);
      const user: User = userData[0];
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOneByCode(code: string): Promise<User> {
    try {
      const userData = await this.databaseService.query(`
      SELECT * FROM user WHERE code='${code}'
      `);
      const user: User = userData[0];
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(toUpdate: User): Promise<User> {
    try {
      const { idx, name, email, passwd, callNum } = toUpdate;
      await this.databaseService.beginTransaction();

      await this.databaseService.query(`
      UPDATE user
      SET
      name='${name}',
      email='${email}',
      passwd='${passwd}',
      callNum='${callNum}'
  
      WHERE idx=${idx};
      `);
      const userData = await this.databaseService.query(`
          SELECT * 
          FROM user 
          WHERE idx = ${idx};`);

      await this.databaseService.commit();

      const user: User = userData[0];
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async remove(idx: number): Promise<User> {
    try {
      await this.databaseService.beginTransaction();
      const userData = await this.databaseService.query(`
      SELECT * FROM user WHERE idx=${idx};
      `);

      await this.databaseService.query(`
          DELETE from user
          WHERE idx=${idx}
          `);

      await this.databaseService.commit();

      const user: User = userData[0];

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
