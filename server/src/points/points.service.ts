import { CreatePointsDto } from './dto/create-points.dto';
import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetPointsDto } from './dto/get-points.dto';

@Injectable()
export class PointsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService
  ) {}
  /**
   * 유저 별 전체 포인트 확인 함수
   * @returns 유저의 전체 포인트 내역을 배열로 줍니다.
   */
  async findUserAllPoint(userCode: string): Promise<any> {
    const con = await this.databaseService.getConnection();
    if (!con) {
      throw new Error();
    }
    try {
      const pointsRowData = await con.query(
        `SELECT idx,point,expire_date,created_time 
        FROM points where fk_user_code = '${userCode}';`
      );
      return pointsRowData[0];
    } catch (error) {
      con.release();
      throw error;
    } finally {
      con.release();
    }
  }

  /**
   * 포인트 전체 확인 함수
   * @returns 전체 주문을 배열로 줍니다.
   */
  async findAll(): Promise<any> {
    const con = await this.databaseService.getConnection();
    if (!con) {
      throw new Error();
    }
    try {
      const pointsRowData = await con.query(
        `SELECT * 
        FROM points;`
      );
      return pointsRowData[0];
    } catch (error) {
      con.release();
      throw error;
    } finally {
      con.release();
    }
  }

  /**
   * 포인트 하나 불러오는 함수
   * @param code 주문 code 값
   * @returns 하나값만 불러와줌
   */
  async findOne(code: string): Promise<GetPointsDto> {
    const con = await this.databaseService.getConnection();
    if (!con) {
      throw new Error();
    }
    try {
      const orderRowData = await con.query(`
      SELECT * 
      FROM orders 
      WHERE code = "${code}"`);
      return orderRowData[0][0];
    } catch (error) {
      con.release();
      throw error;
    } finally {
      con.release();
    }
  }
}
