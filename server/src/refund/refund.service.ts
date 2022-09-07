import { Injectable } from '@nestjs/common';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { GetRefundDto } from './dto/get-refund.dto';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class RefundService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * 환불 등록
   * @param createRefundDto
   * @return boolean 값으로 리턴 'true'/'false'
   */
  async create(createRefundDto: CreateRefundDto): Promise<boolean> {
    try {
      const [con, code] = await Promise.all([
        this.databaseService.getConnection(),
        this.databaseService.genCode(),
      ]);
      await con.query(`
          INSERT INTO refunds
          (code,
            amount,
            name,
            reason_type,
            reason_detail,
            fk_order_code,
            fk_site_code)
          VALUES ('${code}',
          '${createRefundDto.amount}',
          '${createRefundDto.reason_type}',
          '${createRefundDto.reason_detail}',
          '${createRefundDto.fk_order_code}'
          `);
      con.release();
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 환불 전체 조회
   * @param perPage
   * @param code
   * @param site_code
   * @return GetRefundDto[] : 전체 환불 데이터가 페이지 네이션 된 값
   */
  async findAll(
    perPage: number,
    code: string,
    site_code: string
  ): Promise<GetRefundDto[]> {
    console.log(code);
    const con = await this.databaseService.getConnection();
    try {
      const [row] = await con.query(`
    SELECT idx FROM refunds WHERE code = '${code}' &&fk_site_code ='${site_code}'
    `);
      const cursorIdx = row[0].idx;
      const [refundData] = await con.query(`
      SELECT
        *
        FROM refunds
        WHERE
        idx >= '${cursorIdx}' AND fk_site_code='${site_code}'
        LIMIT ${perPage};
        `);
      console.log(refundData);
      console.log(refundData[0]);
      const refunds: GetRefundDto[] = [];
      for (const i in refundData) {
        refunds.push(refundData[i]);
      }
      console.log(refunds);
      con.release();
      return refunds;
    } catch (error) {
      throw error;
    }
  }

  /**
   * code값으로 환불 단일 조회
   * @param code
   * @return GetRefundDto : code값으로 단일 조회 된 값
   */
  async findOne(code: string): Promise<GetRefundDto> {
    try {
      const refundData = await this.databaseService.query(`
      SELECT * FROM refunds WHERE code='${code}'
      `);
      const refunds: GetRefundDto = refundData[0];
      return refunds;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 환불정보 업데이트
   * @param code주문
   * @param updateRefundDto
   */
  async update(code: string, updateRefundDto: UpdateRefundDto) {
    try {
      const refundData = await this.databaseService.query(`
      SELECT * FROM refunds WHERE code = '${code}'`);
      const refund: GetRefundDto = refundData[0];
      const newRefund = await this.databaseService.query(`
    UPDATE refunds
    SET 
    price =  IF(${updateRefundDto.amount != undefined},'${
        updateRefundDto.amount
      }','${refund.amount}'),
    name =  IF(${updateRefundDto.reason_type != undefined},'${
        updateRefundDto.reason_type
      }','${refund.reason_type}'),
    prodStatus = IF(${updateRefundDto.reason_detail != undefined},'${
        updateRefundDto.reason_detail
      }','${refund.reason_detail}'),
    stock = IF(${updateRefundDto.fk_order_code != undefined},'${
        updateRefundDto.fk_order_code
      }','${refund.fk_order_code}'),
    image_url = IF(${updateRefundDto.fk_site_code != undefined},'${
        updateRefundDto.fk_site_code
      }','${refund.fk_site_code}')
    WHERE code='${code}';
    `);
      return newRefund[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * 환불 취소
   * @param code
   */
  async remove(code: string) {
    try {
      const refund = await this.databaseService.query(`
    DELETE FROM refunds WHERE code='${code}';`);
      return refund[0];
    } catch (error) {
      throw error;
    }
  }
}
