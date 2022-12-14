import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';

@Injectable()
export class UsefulService {
  constructor(private readonly configService: ConfigService) {}
  packitTransformer(
    packit:
      | RowDataPacket[]
      | RowDataPacket[][]
      | OkPacket
      | OkPacket[]
      | ResultSetHeader
  ) {
    const array = [];
    for (const i in packit) {
      array.push(packit[i]);
    }
    return array;
  }
  /**
   * 포인트 계산기
   * @param price 총합 가격을 넣어주면
   * @returns 총합가격의 POINT_RATE%로 계산해서 리턴
   */
  saveUpPoint(price: number) {
    const pointRate = this.configService.get<number>('POINT_RATE');
    const point = price * pointRate;
    return point;
  }
  /**
   * 포인트 만료 기간 계산기
   * @returns 포인트 만료날짜를 현재날짜+POINT_EXPIRE_PLUS_YEAR_DATE 값으로 더해서돌려줌
   */
  expireDatePoint() {
    const today = new Date();
    const year =
      today.getFullYear() +
      parseInt(this.configService.get<string>('POINT_EXPIRE_PLUS_YEAR_DATE'));
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);
    const currentTime = year + month + day + hours + minutes + seconds;

    return currentTime;
  }
}
