import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';

@Injectable()
export class DatabaseService {
  private connection: Connection;
  constructor(){
    dotenv.config()
    createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }).then((connection)=>{
      this.connection = connection;
    }).then(()=>
    console.log("db connected.."))
  }

  getConnection(){
    return this.connection;
  }
}
