import { Injectable } from '@nestjs/common';
import { Connection, createConnection, createPool, Pool } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { v4 } from 'uuid';

@Injectable()
export class DatabaseService {
  private connection: Connection;
  private pool: Pool;
  constructor() {
    dotenv.config();
    this.pool = createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectionLimit: 10,
      connectTimeout: 5000,
    });
  }

  async getConnection() {
    await this.pool.getConnection();
  }

  async query(sql: string) {
    const data = await this.pool.query(sql);
    return data[0];
  }

  async release() {}

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
}
