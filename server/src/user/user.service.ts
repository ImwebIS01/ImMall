import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  /** 회원가입 서비스*/
  async register(createUserDto: CreateUserDto): Promise<GetUserDto> {
    try {
      const salt: string = await bcrypt.genSalt();
      const [hashedPasswd, code] = await Promise.all([
        bcrypt.hash(createUserDto.passwd, salt),
        this.databaseService.genCode(),
      ]);
      await this.databaseService.query(`
      INSERT INTO user 
      (code, name, email, passwd, callnum, fk_site_code, fk_membership_code) 
      VALUES ("${code}","${createUserDto.name}","${createUserDto.email}", "${hashedPasswd}", "${createUserDto.callnum}", "${createUserDto.fk_site_code}", "${createUserDto.fk_membership_code}");
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

  async login(authCredentialDto: AuthCredentialDto): Promise<TokenDto> {
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
        const token = this.jwtService.sign(payload);
        return { token, expiresIn: '1h' };
      } else {
        throw new UnauthorizedException('잘못된 이메일 또는 비밀번호 입니다.');
      }
    } catch (error) {
      throw error;
    }
  }

  async getAll(
    page: number,
    perPage: number,
    site_code?: string
  ): Promise<GetUserDto[] | object> {
    const con = await this.databaseService.getConnection();
    try {
      if (site_code) {
        const firstOne = (
          await con.query(`
        SELECT
        * 
        FROM 
        user 
        WHERE 
        fk_site_code="${site_code}"
        ORDER BY
        idx ASC
        LIMIT 1;
        `)
        )[0];
        if (firstOne[0] === undefined) {
          return [];
        }
        const startIndex: number = perPage * (page - 1) + firstOne[0].idx;
        const usersData: object = (
          await con.query(`
        SELECT
        *
        FROM user
        WHERE
        idx >= ${startIndex} && fk_site_code="${site_code}"
        ORDER BY
        idx DESC
        LIMIT ${perPage};
        `)
        )[0];
        const users: any = usersData;
        return users;
      }
      const firstOne = await this.databaseService.query(`
      SELECT 
      * 
      FROM 
      user 
      ORDER BY idx ASC 
      LIMIT 1`);
      if (firstOne[0] === undefined) {
        return [];
      }
      const startIndex: number = perPage * (page - 1) + firstOne[0].idx;
      const usersData: object = await this.databaseService.query(`
      SELECT 
      * 
      FROM 
      user 
      WHERE 
      idx >= ${startIndex} 
      ORDER BY idx DESC 
      LIMIT ${perPage};
      `);
      const users: any = usersData;
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getOneByIdx(idx: number): Promise<GetUserDto> {
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

  async getOne(code: string): Promise<GetUserDto> {
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

  async setOne(
    code: string,
    updateUserDto: UpdateUserDto
  ): Promise<GetUserDto> {
    try {
      const userData = await this.databaseService.query(`
      SELECT * 
      FROM user 
      WHERE code = ${code};`);
      const user: GetUserDto = userData[0];

      const name = updateUserDto.name ? updateUserDto.name : user.name;
      const email = updateUserDto.email ? updateUserDto.email : user.email;
      const passwd = updateUserDto.passwd ? updateUserDto.passwd : user.passwd;
      const callnum = updateUserDto.callnum
        ? updateUserDto.callnum
        : user.callnum;
      const fk_site_code = updateUserDto.fk_site_code
        ? updateUserDto.fk_site_code
        : user.fk_site_code;
      const fk_membership_code = updateUserDto.fk_membership_code
        ? updateUserDto.fk_membership_code
        : user.fk_membership_code;

      await this.databaseService.query(`
        UPDATE user
        SET
        name='${name}',
        email='${email}',
        passwd='${passwd}',
        callnum='${callnum}'
        fk_site_code='${fk_site_code}'
        fk_membership_code='${fk_membership_code}'
        WHERE code=${code};
        `);
      const newUserData = await this.databaseService.query(`
            SELECT * 
            FROM user 
            WHERE code = ${code};`);

      await this.databaseService.commit();

      const newUser = newUserData[0];
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async remove(code: string): Promise<GetUserDto> {
    try {
      const userData = await this.databaseService.query(`
      SELECT * FROM user WHERE code=${code};
      `);

      await this.databaseService.query(`
          DELETE from user
          WHERE code=${code}
          `);

      const user: GetUserDto = userData[0];

      return user;
    } catch (error) {
      throw error;
    }
  }

  async removeAll() {
    try {
      const connection = await this.databaseService.getConnection();
      await this.databaseService.query(`
      TRUNCATE TABLE user;
      `);
      return this.databaseService.query(`
      SELECT * FROM user;
      `);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
