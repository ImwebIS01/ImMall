import { Injectable } from '@nestjs/common';
import {
  Connection,
  createPool,
  FieldPacket,
  OkPacket,
  Pool,
  PoolConnection,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  private pool: Pool;
  constructor(private readonly configService: ConfigService) {
    this.pool = createPool({
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      user: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      connectionLimit: 10,
      connectTimeout: 5000,
    });
  }

  async getConnection(): Promise<PoolConnection> {
    return this.pool.getConnection();
  }

  async query(
    sql: string
  ): Promise<
    | RowDataPacket[]
    | RowDataPacket[][]
    | OkPacket
    | OkPacket[]
    | ResultSetHeader
  > {
    const conn: PoolConnection = await this.pool.getConnection();
    const data: [
      (
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket
        | OkPacket[]
        | ResultSetHeader
      ),
      FieldPacket[]
    ] = await conn.query(sql);
    conn.release();
    return data[0];
  }

  async commit(): Promise<void> {
    const con = await this.pool.getConnection();
    con.commit();
  }

  async genCode(): Promise<string> {
    const uuid = () => {
      const tokens = v4().split('-');
      return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
    };

    return uuid();
  }

  async end(): Promise<void> {
    return this.pool.end();
  }
}
