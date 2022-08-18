import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { v4 } from 'uuid';

@Injectable()
export class DatabaseService {
  private connection: Connection;
  constructor() {
    dotenv.config();
    createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
      .then((connection) => {
        this.connection = connection;
      })
      .then(() => console.log('db connected..'));
  }

  getConnection() {
    return this.connection;
  }

  async query(sql: string) {
    const data = await this.connection.query(sql);
    return data[0];
  }

  async beginTransaction() {
    return this.connection.beginTransaction();
  }

  async commit() {
    return this.connection.commit();
  }

  async genCode() {
    const uuid = () => {
      const tokens = v4().split('-');
      return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
    };
    return uuid();
  }
}
