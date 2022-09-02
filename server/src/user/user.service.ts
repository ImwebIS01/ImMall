import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import PoolConnection from 'mysql2/typings/mysql/lib/PoolConnection';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';
import { query } from 'express';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  /** 회원가입 */
  async register(createUserDto: CreateUserDto): Promise<boolean> {
    try {
      const code = this.databaseService.genCode();
      const [con, salt] = await Promise.all([
        this.databaseService.getConnection(),
        bcrypt.genSalt(),
      ]);
      const hashedPasswd = await bcrypt.hash(createUserDto.passwd, salt);
      await con.query(`
      INSERT INTO user 
      (code, name, email, passwd, callnum, fk_site_code, fk_membership_code) 
      VALUES ("${code}","${createUserDto.name}","${createUserDto.email}", "${hashedPasswd}", "${createUserDto.callnum}", "${createUserDto.fk_site_code}", "${createUserDto.fk_membership_code}");
      `);
      con.release();
      return true;
    } catch (error) {
      throw error;
    }
  }

  /** 로그인 */
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

  /** 전체 조회(OFFSET) */
  async getAllOffset(page: number, perPage: number): Promise<GetUserDto[]> {
    const con = await this.databaseService.getConnection();
    try {
      const totalCount: number = (
        await con.query(`
      SELECT COUNT(*) AS total_count FROM user;
      `)
      )[0][0].total_count;
      const totalPage: number = Math.ceil(totalCount / perPage);
      if (totalPage < page) {
        page = totalPage;
      }
      const users: GetUserDto[] = [];

      /** offset 방식*/
      const usersData:
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket
        | OkPacket[]
        | ResultSetHeader = (
        await con.query(`
        SELECT * 
        FROM user
        LIMIT ${(page - 1) * perPage}, ${perPage};
      `)
      )[0];

      for (let i in usersData) {
        users.push(usersData[i]);
      }
      con.release();
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /** 전체 조회(CURSOR)*/
  async getAllCursor(perPage: number, code: string): Promise<GetUserDto[]> {
    try {
      const con = await this.databaseService.getConnection();
      const cursorIdx = (
        await con.query(`
      SELECT * FROM user WHERE code="${code}";
      `)
      )[0][0].idx;
      const userDataByCursor:
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket
        | OkPacket[]
        | ResultSetHeader = (
        await con.query(`
      SELECT * 
      FROM user
      WHERE idx >= "${cursorIdx}"
      LIMIT ${perPage}
      ;
      `)
      )[0];
      const users: GetUserDto[] = [];
      for (let i in userDataByCursor) {
        users.push(userDataByCursor[i]);
      }
      con.release();
      return users;
    } catch (error) {
      throw error;
    }
  }

  /** 특정 사이트 유저 전체 조회(OFFSET) */
  async getAllBySiteOffset(
    page: number,
    perPage: number,
    site: string
  ): Promise<GetUserDto[]> {
    const con = await this.databaseService.getConnection();
    try {
      const totalCount: number = (
        await con.query(`
        SELECT COUNT(*) AS total_count FROM user;
        `)
      )[0][0].total_count;
      const totalPage: number = Math.ceil(totalCount / perPage);
      if (totalPage < page) {
        page = totalPage;
      }
      const users: GetUserDto[] = [];

      /** offset 방식*/
      const usersData:
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket
        | OkPacket[]
        | ResultSetHeader = (
        await con.query(`
          SELECT * 
          FROM user
          WHERE fk_site_code="${site}"
          LIMIT ${(page - 1) * perPage}, ${perPage};
        `)
      )[0];

      for (let i in usersData) {
        users.push(usersData[i]);
      }
      con.release();
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /** 특정 사이트 유저 전체 조회(CURSOR) */
  async getAllBySiteCursor(
    perPage: number,
    code: string,
    site: string
  ): Promise<GetUserDto[]> {
    try {
      const con = await this.databaseService.getConnection();
      const cursorIdx = (
        await con.query(`
        SELECT * FROM user WHERE code="${code}";
        `)
      )[0][0].idx;
      const userDataByCursor:
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket
        | OkPacket[]
        | ResultSetHeader = (
        await con.query(`
        SELECT * 
        FROM user
        WHERE idx >= "${cursorIdx}" AND fk_site_code="${site}"
        LIMIT ${perPage}
        ;
        `)
      )[0];
      const users: GetUserDto[] = [];
      for (let i in userDataByCursor) {
        users.push(userDataByCursor[i]);
      }
      con.release();
      return users;
    } catch (error) {
      throw error;
    }
  }

  /** code로 조회 */
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

  /** idx로 조회 */
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

  /** email로 조회 */
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

  /** 유저 업데이트 */
  async setOne(code: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    try {
      const con = await this.databaseService.getConnection();
      const userData = (
        await con.query(`
      SELECT * 
      FROM user 
      WHERE code = ${code};`)
      )[0];
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

      await con.query(`
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

      con.release();
      return true;
    } catch (error) {
      throw error;
    }
  }

  /** 유저 삭제 */
  async remove(code: string): Promise<boolean> {
    try {
      await this.databaseService.query(`
          DELETE from user
          WHERE code=${code}
          `);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
