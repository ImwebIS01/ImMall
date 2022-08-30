import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection, createPool, Pool } from 'mysql2/promise';
import { v4 } from 'uuid';

@Injectable()
export class DatabaseService {
  private connection: Connection;
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

  async getConnection() {
    return this.pool.getConnection();
  }

  async query(sql: string) {
    const conn = await this.pool.getConnection();
    const data = await conn.query(sql);
    conn.release();
    return data[0];
  }

  async release() {
    const conn = await this.pool.getConnection();
    return conn.release();
  }

  async beginTransaction() {
    const con = await this.pool.getConnection();
    return con.beginTransaction();
  }

  async commit() {
    const con = await this.pool.getConnection();
    return con.commit();
  }

  async genCode() {
    const uuid = () => {
      const tokens = v4().split('-');
      return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
    };

    return uuid();
  }

  async end() {
    return this.pool.end();
  }
}
