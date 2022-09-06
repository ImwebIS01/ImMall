import { Injectable } from '@nestjs/common';
import {
  createPool,
  FieldPacket,
  OkPacket,
  Pool,
  PoolConnection,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise';
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
      connectionLimit: 2,
      connectTimeout: 5000,
    });
  }

  async getConnection(): Promise<PoolConnection> {
    try {
      return this.pool.getConnection();
    } catch (error) {
      throw error;
    }
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
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async genCode(): Promise<string> {
    try {
      const uuid = () => {
        const tokens = v4().split('-');
        return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
      };

      return uuid();
    } catch (error) {
      throw error;
    }
  }

  async end(): Promise<void> {
    try {
      return this.pool.end();
    } catch (error) {
      throw error;
    }
  }
}
