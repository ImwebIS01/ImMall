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
  async create(
    order_productCode: string,
    createRefundDto: CreateRefundDto
  ): Promise<object> {
    const [con, code] = await Promise.all([
      this.databaseService.getConnection(),
      this.databaseService.genCode(),
    ]);
    if (!con) {
      throw new Error();
    }
    try {
      await con.beginTransaction();
      await con.query(`
          INSERT INTO refunds
          (code,
            amount,
            reason_type,
            reason_detail,
            fk_order_code,
            fk_site_code
            )
          VALUES ('${code}',
          '${createRefundDto.amount}',
          '${createRefundDto.reason_type}',
          '${createRefundDto.reason_detail}',
          '${createRefundDto.fk_order_code}',
          '${createRefundDto.fk_site_code}')
          `);
      const refundOrderProductCode = await this.databaseService.genCode();
      await con.query(`
          INSERT INTO refund_order_product(code, fk_order_product_code, fk_refund_code) VALUES('${refundOrderProductCode}', '${order_productCode}','${code}')
      `);
      await con.commit();
      return { success: true, code };
    } catch (error) {
      con.release();
      throw error;
    } finally {
      con.release();
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
    const con = await this.databaseService.getConnection();

    if (!con) {
      throw new Error();
    }
    try {
      const [row] = await con.query(`
    SELECT idx FROM refunds WHERE code = '${code}' &&fk_site_code ='${site_code}'
    `);
      const cursorIdx = row[0].idx;
      const [refundData] = await con.query(`
      SELECT
        idx, code, amount, reason_type, reason_detail, DATE_FORMAT(updated_time,'%Y/%m/%d'),  DATE_FORMAT(created_time,'%Y/%m/%d'), fk_order_code, fk_site_code
        FROM refunds
        WHERE
        idx >= '${cursorIdx}' AND fk_site_code='${site_code}'
        LIMIT ${perPage};
        `);
      const refunds: GetRefundDto[] = [];
      for (const i in refundData) {
        refunds.push(refundData[i]);
      }
      console.log(refunds);

      return refunds;
    } catch (error) {
      con.release();
      throw error;
    } finally {
      con.release();
    }
  }
  /**Order 정보 조회
   */
  async findOrderInfo(code: string) {
    const con = await this.databaseService.getConnection();
    try {
      const [refundData] = await con.query(`
      SELECT O.code,
      O.order_no,
      O.site_code,
      O.user_code,
      O.post_number,
      O.receiver_name,
      O.receiver_address,
      O.receiver_phone,
      O.receiver_phone2,
      O.status,
      O.total_price
        from refunds R
        inner join refund_order_product ROP
        on R.code = ROP.fk_refund_code
        inner join order_product OP
        on ROP.fk_order_product_code = OP.code
        inner join orders O
        on OP.fk_order_code = O.code
      WHERE R.code = '${code}'
      `);
      console.log(refundData);
      return refundData[0];
    } catch (error) {
      con.release();
      throw error;
    } finally {
      con.release();
    }
  }

  /**Product 정보 조회 */
  async findProductInfo(code: string) {
    const con = await this.databaseService.getConnection();
    try {
      const [refundData] = await con.query(`
      SELECT P.code,
      P.price,
      P.updated_time,
      P.name,
      P.prodStatus,
      P.created_time,
      P.stock,
      P.image_url,
      P.description,
      P.category,
      P.fk_site_code
        from refunds R
        inner join refund_order_product ROP
        on R.code = ROP.fk_refund_code
        inner join order_product OP
        on ROP.fk_order_product_code = OP.code
        inner join products P
        on OP.fk_product_code = P.code
      WHERE R.code = '${code}'
      `);
      console.log(refundData);
      return refundData[0];
    } catch (error) {
      con.release();
      throw error;
    } finally {
      con.release();
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
      SELECT idx, code, amount, reason_type, reason_detail, DATE_FORMAT(updated_time,'%Y/%m/%d') as updated_time,  DATE_FORMAT(created_time,'%Y/%m/%d') as created_time, fk_order_code, fk_site_code FROM refunds WHERE code='${code}'
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
    const con = await this.databaseService.getConnection();
    if (!con) {
      throw new Error();
    }
    try {
      console.log(code);
      const [refundData] = await con.query(`
      SELECT * FROM refunds WHERE code='${code}'
      `);
      console.log(refundData);
      const refund: GetRefundDto = refundData[0];
      const amount = updateRefundDto.amount
        ? updateRefundDto.amount
        : refund.amount;
      const reason_type = updateRefundDto.reason_type
        ? updateRefundDto.reason_type
        : refund.reason_type;
      const reason_detail = updateRefundDto.reason_detail
        ? updateRefundDto.reason_detail
        : refund.reason_detail;
      const fk_order_code = updateRefundDto.fk_order_code
        ? updateRefundDto.fk_order_code
        : refund.fk_order_code;
      const fk_site_code = updateRefundDto.fk_site_code
        ? updateRefundDto.fk_site_code
        : refund.fk_site_code;

      await con.query(`
    UPDATE refunds 
    SET 
    amount = '${amount}',
    reason_type = '${reason_type}',
    reason_detail = '${reason_detail}',
    fk_order_code='${fk_order_code}',
    fk_site_code='${fk_site_code}'
    WHERE code='${code}';
    `);
      return true;
    } catch (error) {
      con.release();
      throw error;
    } finally {
      con.release();
    }
  }

  /**
   * 환불 취소
   * @param code
   */
  async remove(code: string) {
    const con = await this.databaseService.getConnection();
    if (!con) {
      throw new Error();
    }
    try {
      await con.query(`
    DELETE FROM refunds WHERE code='${code}';`);
      return true;
    } catch (error) {
      con.release();
      throw error;
    } finally {
      con.release();
    }
  }
}
