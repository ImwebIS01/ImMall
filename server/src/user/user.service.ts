import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';

// input-output dto 모두 있어야 함
@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const salt: string = await bcrypt.genSalt();
      const hashedPasswd = await bcrypt.hash(createUserDto.passwd, salt);
      createUserDto.passwd = hashedPasswd;

      const code = await this.databaseService.genCode();
      const { name, email, passwd, callNum } = createUserDto;
      await this.databaseService.query(`
      INSERT INTO user 
      (code, name, email, passwd, callNum) 
      VALUES ("${code}","${name}","${email}", "${passwd}", "${callNum}");
      `);
      const data = await this.databaseService.query(`
      SELECT * FROM user WHERE code="${code}";
      `);
      const user: GetUserDto = data[0];
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(authCredentialDto: AuthCredentialDto): Promise<string> {
    try {
      const { email, passwd } = authCredentialDto;

      const userData = await this.databaseService.query(`
          SELECT * 
          FROM user 
          WHERE email = '${email}';
          `);

      const user = userData[0];
      if (user && (await bcrypt.compare(passwd, user.passwd))) {
        const payload = { name: user.name, email: email };
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
      } else {
        throw new UnauthorizedException('잘못된 이메일 또는 비밀번호 입니다.');
      }
    } catch (error) {
      throw error;
    }
  }

  async getAll(page: number, perPage: number) {
    try {
      const firstOne = await this.databaseService.query(`
      SELECT * FROM user ORDER BY idx ASC LIMIT 1`);
      const startIndex: number = perPage * (page - 1) + firstOne[0].idx;
      const usersData: object = await this.databaseService.query(`
      SELECT * FROM user where idx >= ${startIndex} ORDER BY idx ASC LIMIT ${perPage};
      `);
      const users: any = usersData;
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getOne(idx: number): Promise<GetUserDto> {
    try {
      const userData = await this.databaseService.query(`
          SELECT * 
          FROM user 
          WHERE idx = ${idx};`);
      const user = userData[0];
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getOneByCode(code: string): Promise<GetUserDto> {
    try {
      const userData = await this.databaseService.query(`
      SELECT * FROM user WHERE code='${code}'
      `);
      const user = userData[0];
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getOneByEmail(email: string): Promise<GetUserDto> {
    try {
      const userData = await this.databaseService.query(`
          SELECT * 
          FROM user 
          WHERE email = '${email}';`);

      const user = userData[0];
      return user;
    } catch (error) {
      throw error;
    }
  }

  async setOne(idx: number, updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    try {
      const userData = await this.databaseService.query(`
      SELECT * 
      FROM user 
      WHERE idx = ${idx};`);
      const user: User = userData[0];

      const name = updateUserDto.name ? updateUserDto.name : user.name;
      const email = updateUserDto.email ? updateUserDto.email : user.email;
      const passwd = updateUserDto.passwd ? updateUserDto.passwd : user.passwd;
      const callNum = updateUserDto.callNum
        ? updateUserDto.callNum
        : user.callNum;
      await this.databaseService.query(`
        UPDATE user
        SET
        name='${name}',
        email='${email}',
        passwd='${passwd}',
        callNum='${callNum}'
    
        WHERE idx=${idx};
        `);
      const newUserData = await this.databaseService.query(`
            SELECT * 
            FROM user 
            WHERE idx = ${idx};`);

      await this.databaseService.commit();

      const newUser = userData[0];
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async remove(idx: number): Promise<GetUserDto> {
    try {
      const userData = await this.databaseService.query(`
      SELECT * FROM user WHERE idx=${idx};
      `);

      await this.databaseService.query(`
          DELETE from user
          WHERE idx=${idx}
          `);

      const user: GetUserDto = userData[0];

      return user;
    } catch (error) {
      throw error;
    }
  }
}
